/**
 * Multi-user integration test suite for Hotline Modern
 * Tests: auth, agreement, channels, chat, DMs, E2E encryption,
 *        read receipts, voice messages, system messages, tracker, status
 */
import WebSocket from "ws";
import nacl from "tweetnacl";
import tweetnaclUtil from "tweetnacl-util";
const { encodeBase64, decodeBase64 } = tweetnaclUtil;
import http from "http";

const SERVER = "ws://localhost:9998/ws";
const TRACKER = "http://localhost:9998";
let passed = 0;
let failed = 0;
const results = [];

function assert(condition, name) {
  if (condition) {
    passed++;
    results.push(`  ✅ ${name}`);
  } else {
    failed++;
    results.push(`  ❌ ${name}`);
  }
}

function toHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

function signMessage(message, secretKey) {
  const messageBytes = new TextEncoder().encode(message);
  const signature = nacl.sign.detached(messageBytes, secretKey);
  return toHex(signature);
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

function createClient(nickname) {
  const signKP = nacl.sign.keyPair();
  const boxKP = nacl.box.keyPair();
  return {
    nickname,
    signKP,
    boxKP,
    publicKeyHex: toHex(signKP.publicKey),
    boxPublicKeyHex: toHex(boxKP.publicKey),
    ws: null,
    messages: [],
    userId: null,
    serverInfo: null,
  };
}

function connectClient(client) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(SERVER);
    client.ws = ws;
    let authResolved = false;

    ws.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      client.messages.push(msg);

      if (msg.type === "auth.nonce") {
        // Server sends nonce on connect — sign just the nonce (matches client protocol)
        const nonce = msg.payload.nonce;
        const signature = signMessage(nonce, client.signKP.secretKey);
        ws.send(JSON.stringify({
          type: "auth",
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          payload: {
            publicKey: client.publicKeyHex,
            nickname: client.nickname,
            signature: signature,
            nonce: nonce,
            boxPublicKey: client.boxPublicKeyHex,
          },
        }));
      }

      if (msg.type === "auth.ok" && !authResolved) {
        authResolved = true;
        client.userId = msg.payload.userId;
        client.serverInfo = msg.payload;
        resolve(client);
      }

      if ((msg.type === "error" || msg.type === "auth.error") && !authResolved) {
        authResolved = true;
        reject(new Error(msg.payload?.message || msg.payload?.reason || "Auth failed"));
      }
    });

    ws.on("error", reject);
    setTimeout(() => { if (!authResolved) reject(new Error("Auth timeout")); }, 10000);
  });
}

function waitForMessage(client, type, timeout = 5000) {
  return new Promise((resolve, reject) => {
    // Check already received
    const existing = client.messages.find(m => m.type === type);
    if (existing) {
      resolve(existing);
      return;
    }
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.type === type) {
        client.ws.removeListener("message", handler);
        resolve(msg);
      }
    };
    client.ws.on("message", handler);
    setTimeout(() => {
      client.ws.removeListener("message", handler);
      reject(new Error(`Timeout waiting for ${type}`));
    }, timeout);
  });
}

function waitForMessages(client, type, count, timeout = 5000) {
  return new Promise((resolve) => {
    const collected = [];
    const check = () => {
      for (const m of client.messages) {
        if (m.type === type && !collected.includes(m)) {
          collected.push(m);
        }
      }
      if (collected.length >= count) {
        resolve(collected);
        return true;
      }
      return false;
    };
    if (check()) return;
    const handler = () => { check(); };
    client.ws.on("message", handler);
    setTimeout(() => {
      client.ws.removeListener("message", handler);
      resolve(collected);
    }, timeout);
  });
}

function send(client, type, payload) {
  client.ws.send(JSON.stringify({
    type,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    payload,
  }));
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ============================================================
// TEST SUITE
// ============================================================
async function runTests() {
  console.log("\n🧪 HOTLINE MODERN — Multi-User Integration Tests\n");

  // ---- TRACKER TEST ----
  console.log("📡 Tracker");
  try {
    const serverList = await httpGet(`${TRACKER}/servers`);
    assert(typeof serverList.count === "number", "Tracker /servers returns count");
    assert(serverList.count > 0, "Tracker has self-registered server");
  } catch (e) {
    assert(false, `Tracker: ${e.message}`);
  }

  // ---- AUTH + AGREEMENT ----
  console.log("\n🔑 Authentication & Agreement");
  const alice = createClient("Alice");
  const bob = createClient("Bob");

  try {
    await connectClient(alice);
    assert(!!alice.userId, "Alice authenticated successfully");
    assert(alice.serverInfo.serverName === "Test Server", "Server name received: Test Server");
    assert(alice.serverInfo.agreement?.length > 0, "Server agreement text received");
    assert(alice.serverInfo.agreement.includes("Be respectful"), "Agreement contains rules");
  } catch (e) {
    assert(false, `Alice auth: ${e.message}`);
  }

  try {
    await connectClient(bob);
    assert(!!bob.userId, "Bob authenticated successfully");
  } catch (e) {
    assert(false, `Bob auth: ${e.message}`);
  }

  // ---- SYSTEM MESSAGES (join) ----
  console.log("\n📢 System Messages");
  await sleep(500);
  const aliceJoinMsgs = alice.messages.filter(m => m.type === "user.joined");
  assert(aliceJoinMsgs.length > 0, "Alice received user.joined for Bob");
  if (aliceJoinMsgs.length > 0) {
    const bobJoin = aliceJoinMsgs.find(m => m.payload.nickname === "Bob");
    assert(!!bobJoin, "Join message contains Bob's nickname");
  }

  // ---- USER LIST ----
  console.log("\n👥 User List");
  send(alice, "user.list", {});
  await sleep(500);
  const userListMsg = alice.messages.filter(m => m.type === "user.list").pop();
  assert(!!userListMsg, "Alice received user.list response");
  if (userListMsg) {
    const users = userListMsg.payload.users || [];
    assert(users.length >= 2, `User list has ${users.length} users (expected ≥2)`);
    const bobUser = users.find(u => u.nickname === "Bob");
    assert(!!bobUser, "Bob is in user list");
    assert(!!bobUser?.boxPublicKey, "Bob's boxPublicKey is visible to Alice");
  }

  // ---- CHANNEL CREATE + JOIN ----
  console.log("\n💬 Channel Create & Join");
  send(alice, "channel.create", { name: "test-room", topic: "Integration tests" });
  await sleep(500);
  // Server broadcasts channel.list (not channel.created) after creating
  const chList = alice.messages.filter(m => m.type === "channel.list").pop();
  const hasTestRoom = chList?.payload?.channels?.some(c => c.name === "test-room");
  assert(!!hasTestRoom, "Channel 'test-room' created (appears in channel.list)");

  // Creator is NOT auto-joined — join explicitly
  send(alice, "channel.join", { channel: "test-room" });
  await sleep(300);
  send(bob, "channel.join", { channel: "test-room" });
  await sleep(500);
  // Server sends chat.history messages after join (no explicit "channel.joined" event)
  assert(bob.messages.some(m => m.type === "channel.list"), "Bob received channel list after join");

  // ---- CHAT MESSAGE ----
  console.log("\n💬 Chat Messages");
  send(alice, "chat.send", { channel: "test-room", content: "Hello from Alice!" });
  await sleep(500);
  const bobChatMsgs = bob.messages.filter(m => m.type === "chat.message" && m.payload?.content === "Hello from Alice!");
  assert(bobChatMsgs.length > 0, "Bob received Alice's message");
  if (bobChatMsgs.length > 0) {
    assert(bobChatMsgs[0].payload.nickname === "Alice", "Message has Alice's nickname");
    assert(bobChatMsgs[0].payload.channel === "test-room", "Message in correct channel");
  }

  send(bob, "chat.send", { channel: "test-room", content: "Hello from Bob!" });
  await sleep(500);
  const aliceChatMsgs = alice.messages.filter(m => m.type === "chat.message" && m.payload?.content === "Hello from Bob!");
  assert(aliceChatMsgs.length > 0, "Alice received Bob's message");

  // ---- MARKDOWN / RICH TEXT ----
  console.log("\n📝 Rich Text");
  send(alice, "chat.send", { channel: "test-room", content: "**bold** and *italic* and `code`" });
  await sleep(300);
  const richMsg = bob.messages.filter(m => m.type === "chat.message" && m.payload?.content?.includes("**bold**")).pop();
  assert(!!richMsg, "Rich text message transmitted correctly");

  // ---- MESSAGE EDIT ----
  console.log("\n✏️ Message Edit");
  const aliceMsgId = aliceChatMsgs[0]?.id;
  if (aliceMsgId) {
    // Only Alice (author) should be able to test edit — but let's have Alice edit her own message
    const aliceOwnMsgs = alice.messages.filter(m => m.type === "chat.message" && m.payload?.nickname === "Alice");
    if (aliceOwnMsgs.length > 0) {
      send(alice, "chat.edit", { messageId: aliceOwnMsgs[0].id, content: "Hello from Alice! (edited)" });
      await sleep(500);
      const editedMsg = bob.messages.filter(m => m.type === "chat.edited").pop();
      assert(!!editedMsg, "Bob received edit notification");
    }
  }

  // ---- REACTIONS ----
  console.log("\n👍 Reactions");
  const lastBobChat = bob.messages.filter(m => m.type === "chat.message").pop();
  if (lastBobChat) {
    send(alice, "reaction.add", { messageId: lastBobChat.id, emoji: "👍" });
    await sleep(500);
    const reactionMsg = bob.messages.filter(m => m.type === "reaction.updated").pop();
    assert(!!reactionMsg, "Bob received reaction notification");
    if (reactionMsg) {
      assert(reactionMsg.payload.emoji === "👍" && reactionMsg.payload.action === "add", "Reaction is 👍 with action=add");
    }
  }

  // ---- PIN MESSAGE ----
  console.log("\n📌 Pin Message");
  if (lastBobChat) {
    send(alice, "pin.add", { messageId: lastBobChat.id, channel: "test-room" });
    await sleep(500);
    const pinMsg = bob.messages.filter(m => m.type === "pin.added").pop();
    assert(!!pinMsg, "Pin notification received");
  }

  // ---- READ RECEIPTS ----
  console.log("\n👁️ Read Receipts");
  const aliceLastChat = alice.messages.filter(m => m.type === "chat.message" && m.payload?.nickname === "Alice").pop();
  if (aliceLastChat) {
    send(bob, "chat.read", { channel: "test-room", messageId: aliceLastChat.id });
    await sleep(500);
    const readReceipt = alice.messages.filter(m => m.type === "chat.read_receipt").pop();
    assert(!!readReceipt, "Alice received read receipt from Bob");
    if (readReceipt) {
      assert(readReceipt.payload.userId === bob.publicKeyHex, "Read receipt has Bob's userId");
      assert(readReceipt.payload.messageId === aliceLastChat.id, "Read receipt references correct message");
    }
  }

  // ---- TYPING INDICATOR ----
  console.log("\n⌨️ Typing Indicator");
  send(alice, "typing", { channel: "test-room" });
  await sleep(500);
  const typingMsg = bob.messages.filter(m => m.type === "typing").pop();
  assert(!!typingMsg, "Bob received typing indicator from Alice");

  // ---- USER STATUS ----
  console.log("\n🔵 User Status");
  send(alice, "user.status", { status: "away" });
  await sleep(500);
  const statusMsg = bob.messages.filter(m => m.type === "user.status_changed").pop();
  assert(!!statusMsg, "Bob received Alice's status change");
  if (statusMsg) {
    assert(statusMsg.payload.status === "away", "Alice status changed to 'away'");
  }

  send(alice, "user.status", { status: "busy" });
  await sleep(300);
  const statusMsg2 = bob.messages.filter(m => m.type === "user.status_changed" && m.payload?.status === "busy").pop();
  assert(!!statusMsg2, "Alice status changed to 'busy'");

  send(alice, "user.status", { status: "available" });
  await sleep(300);

  // ---- DM (PLAINTEXT + ENCRYPTED) ----
  console.log("\n💌 Direct Messages");
  send(alice, "dm.send", { targetId: bob.publicKeyHex, content: "Hi Bob, plaintext DM!" });
  await sleep(500);
  const bobDM = bob.messages.filter(m => m.type === "dm.message" && !m.payload?.encrypted).pop();
  assert(!!bobDM, "Bob received plaintext DM from Alice");
  if (bobDM) {
    assert(bobDM.payload.content === "Hi Bob, plaintext DM!", "DM content is correct");
  }

  // ---- E2E ENCRYPTED DM ----
  console.log("\n🔐 E2E Encrypted DMs");
  const plaintext = "Secret message for Bob only! 🤫";
  const messageBytes = new TextEncoder().encode(plaintext);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encrypted = nacl.box(messageBytes, nonce, bob.boxKP.publicKey, alice.boxKP.secretKey);
  assert(!!encrypted, "Message encrypted successfully with nacl.box");

  send(alice, "dm.send", {
    targetId: bob.publicKeyHex,
    content: "[encrypted]",
    encrypted: true,
    ciphertext: encodeBase64(encrypted),
    nonce: encodeBase64(nonce),
    senderBoxPublicKey: alice.boxPublicKeyHex,
  });
  await sleep(500);
  const encDM = bob.messages.filter(m => m.type === "dm.message" && m.payload?.encrypted === true).pop();
  assert(!!encDM, "Bob received encrypted DM");
  if (encDM) {
    assert(encDM.payload.ciphertext?.length > 0, "DM has ciphertext field");
    assert(encDM.payload.nonce?.length > 0, "DM has nonce field");

    // Decrypt on Bob's side
    const ct = decodeBase64(encDM.payload.ciphertext);
    const nc = decodeBase64(encDM.payload.nonce);
    const senderPK = bob.boxKP.publicKey; // Bob uses his own key to open
    // Actually Bob needs Alice's box public key
    const aliceBoxPKBytes = new Uint8Array(alice.boxPublicKeyHex.match(/.{2}/g).map(b => parseInt(b, 16)));
    const decrypted = nacl.box.open(ct, nc, aliceBoxPKBytes, bob.boxKP.secretKey);
    assert(!!decrypted, "Bob decrypted message successfully");
    if (decrypted) {
      const decryptedText = new TextDecoder().decode(decrypted);
      assert(decryptedText === plaintext, `Decrypted text matches: "${decryptedText}"`);
    }
  }

  // ---- VOICE MESSAGE TYPE ----
  console.log("\n🎙️ Voice Messages");
  send(alice, "chat.send", { channel: "test-room", content: "[voice.webm](http://localhost:9999/files/uploads/voice.webm)", msgType: "voice" });
  await sleep(500);
  const voiceMsg = bob.messages.filter(m => m.type === "chat.message" && m.payload?.msgType === "voice").pop();
  assert(!!voiceMsg, "Bob received voice message with msgType='voice'");
  if (voiceMsg) {
    assert(voiceMsg.payload.content.includes("voice.webm"), "Voice message content has audio link");
  }

  // ---- CHANNEL WITH PASSWORD ----
  console.log("\n🔒 Password-Protected Channel");
  send(alice, "channel.create", { name: "secret-room", topic: "VIP only", password: "pass123" });
  await sleep(500);
  const secretChList = alice.messages.filter(m => m.type === "channel.list").pop();
  const hasSecretRoom = secretChList?.payload?.channels?.some(c => c.name === "secret-room");
  assert(!!hasSecretRoom, "Password-protected channel created");

  // Bob tries to join without password
  send(bob, "channel.join", { channel: "secret-room" });
  await sleep(500);
  const joinError = bob.messages.filter(m => m.type === "error" && m.payload?.message?.includes("password")).pop();
  assert(!!joinError, "Bob rejected without password");

  // Bob joins with correct password — server doesn't send "channel.joined", just sends history
  send(bob, "channel.join", { channel: "secret-room", password: "pass123" });
  await sleep(500);
  // No error means success; also Bob won't get another error
  const joinError2 = bob.messages.filter(m => m.type === "error" && m.timestamp > (joinError?.timestamp || 0)).pop();
  assert(!joinError2 || !joinError2.payload?.message?.includes("password"), "Bob joined with correct password (no error)");

  // ---- CHAT HISTORY ----
  console.log("\n📜 Chat History");
  // Clear old messages to isolate the history response
  const beforeHistCount = alice.messages.length;
  send(alice, "chat.history", { channel: "test-room", before: Date.now() + 10000, limit: 50 });
  await sleep(500);
  const historyMsg = alice.messages.slice(beforeHistCount).find(m => m.type === "chat.history");
  assert(!!historyMsg, "Alice received chat history");
  if (historyMsg) {
    const histMsgs = historyMsg.payload.messages || [];
    assert(histMsgs.length > 0, `History has ${histMsgs.length} messages`);
    // Check voice message type persisted in history (msgType is in the payload sub-object)
    const voiceInHistory = histMsgs.find(m => m.payload?.msgType === "voice");
    assert(!!voiceInHistory, "Voice msgType persisted in history");
  }

  // ---- SEARCH ----
  console.log("\n🔍 Search");
  send(alice, "chat.search", { query: "Alice", channel: "" });
  await sleep(500);
  const searchResult = alice.messages.filter(m => m.type === "chat.search_results").pop();
  assert(!!searchResult, "Search returned results");
  if (searchResult) {
    const searchResults = searchResult.payload.results || [];
    assert(searchResults.length > 0, `Found ${searchResults.length} search results`);
  }

  // ---- NICK CHANGE ----
  console.log("\n📛 Nick Change");
  send(bob, "user.nick", { nickname: "Bobby" });
  await sleep(500);
  const nickMsg = alice.messages.filter(m => m.type === "user.nick_changed").pop();
  assert(!!nickMsg, "Alice notified of Bob's nick change");
  if (nickMsg) {
    assert(nickMsg.payload.newNick === "Bobby", "New nickname is 'Bobby'");
  }

  // ---- MESSAGE DELETE ----
  console.log("\n🗑️ Message Delete");
  const aliceTestMsg = alice.messages.filter(m => m.type === "chat.message" && m.payload?.nickname === "Alice").pop();
  if (aliceTestMsg) {
    send(alice, "chat.delete", { messageId: aliceTestMsg.id });
    await sleep(500);
    const deleteMsg = bob.messages.filter(m => m.type === "chat.deleted").pop();
    assert(!!deleteMsg, "Bob received delete notification");
  }

  // ---- CHANNEL LEAVE ----
  console.log("\n🚪 Channel Leave");
  send(bob, "channel.leave", { channel: "test-room" });
  await sleep(300);

  // ---- DISCONNECT + SYSTEM LEFT MESSAGE ----
  console.log("\n👋 Disconnect");
  bob.ws.close();
  await sleep(1000);
  const leftMsg = alice.messages.filter(m => m.type === "user.left" && m.payload?.nickname === "Bobby").pop();
  assert(!!leftMsg, "Alice received user.left for Bobby");

  // ---- 3RD USER: CONCURRENCY ----
  console.log("\n🧑‍🤝‍🧑 Third User (Concurrency)");
  const charlie = createClient("Charlie");
  try {
    await connectClient(charlie);
    assert(!!charlie.userId, "Charlie authenticated successfully");

    send(charlie, "channel.join", { channel: "test-room" });
    await sleep(500);
    send(charlie, "chat.send", { channel: "test-room", content: "Charlie here!" });
    await sleep(500);
    const charlieMsg = alice.messages.filter(m => m.type === "chat.message" && m.payload?.content === "Charlie here!").pop();
    assert(!!charlieMsg, "Alice received Charlie's message");

    charlie.ws.close();
  } catch (e) {
    assert(false, `Charlie: ${e.message}`);
  }

  // ---- CLEANUP ----
  alice.ws.close();
  await sleep(500);

  // ---- FINAL REPORT ----
  console.log("\n" + "=".repeat(50));
  console.log("📊 TEST RESULTS");
  console.log("=".repeat(50));
  for (const r of results) console.log(r);
  console.log("=".repeat(50));
  console.log(`\n✅ Passed: ${passed}  ❌ Failed: ${failed}  Total: ${passed + failed}`);
  console.log(failed === 0 ? "\n🎉 ALL TESTS PASSED!\n" : "\n⚠️ SOME TESTS FAILED\n");
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});

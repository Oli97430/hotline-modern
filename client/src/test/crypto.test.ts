import nacl from "tweetnacl";
import { beforeEach, describe, expect, it } from "vitest";
import {
  decryptDM,
  encryptDM,
  fromHex,
  generateIdentity,
  getBoxPublicKeyHex,
  getOrCreateIdentity,
  getPublicKeyHex,
  loadIdentity,
  saveIdentity,
  signMessage,
  toHex,
} from "../lib/crypto";

describe("crypto", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("toHex / fromHex", () => {
    it("converts bytes to hex string", () => {
      const bytes = new Uint8Array([0, 15, 255, 128]);
      expect(toHex(bytes)).toBe("000fff80");
    });

    it("converts hex string back to bytes", () => {
      const hex = "000fff80";
      const bytes = fromHex(hex);
      expect(bytes).toEqual(new Uint8Array([0, 15, 255, 128]));
    });

    it("roundtrips correctly", () => {
      const original = new Uint8Array([1, 2, 3, 100, 200, 255]);
      expect(fromHex(toHex(original))).toEqual(original);
    });

    it("handles empty input", () => {
      expect(toHex(new Uint8Array([]))).toBe("");
      expect(fromHex("")).toEqual(new Uint8Array([]));
    });
  });

  describe("generateIdentity", () => {
    it("creates a valid Ed25519 keypair and Curve25519 box keypair", () => {
      const identity = generateIdentity();
      expect(identity.publicKey).toBeInstanceOf(Uint8Array);
      expect(identity.secretKey).toBeInstanceOf(Uint8Array);
      expect(identity.publicKey.length).toBe(32);
      expect(identity.secretKey.length).toBe(64);
      expect(identity.boxPublicKey).toBeInstanceOf(Uint8Array);
      expect(identity.boxSecretKey).toBeInstanceOf(Uint8Array);
      expect(identity.boxPublicKey.length).toBe(32);
      expect(identity.boxSecretKey.length).toBe(32);
    });

    it("generates unique keypairs", () => {
      const id1 = generateIdentity();
      const id2 = generateIdentity();
      expect(toHex(id1.publicKey)).not.toBe(toHex(id2.publicKey));
      expect(toHex(id1.boxPublicKey)).not.toBe(toHex(id2.boxPublicKey));
    });
  });

  describe("saveIdentity / loadIdentity", () => {
    it("saves and loads identity from localStorage", () => {
      const identity = generateIdentity();
      saveIdentity(identity);
      const loaded = loadIdentity();
      expect(loaded).not.toBeNull();
      expect(toHex(loaded!.publicKey)).toBe(toHex(identity.publicKey));
      expect(toHex(loaded!.secretKey)).toBe(toHex(identity.secretKey));
      expect(toHex(loaded!.boxPublicKey)).toBe(toHex(identity.boxPublicKey));
      expect(toHex(loaded!.boxSecretKey)).toBe(toHex(identity.boxSecretKey));
    });

    it("returns null when no identity is stored", () => {
      expect(loadIdentity()).toBeNull();
    });

    it("returns null on corrupted data", () => {
      localStorage.setItem("hotline-identity", "not-json");
      expect(loadIdentity()).toBeNull();
    });

    it("generates box keys for legacy identities missing them", () => {
      // Simulate an old identity without box keys
      const kp = nacl.sign.keyPair();
      const { encodeBase64 } = require("tweetnacl-util");
      const legacyData = {
        publicKey: encodeBase64(kp.publicKey),
        secretKey: encodeBase64(kp.secretKey),
      };
      localStorage.setItem("hotline-identity", JSON.stringify(legacyData));
      const loaded = loadIdentity();
      expect(loaded).not.toBeNull();
      expect(loaded!.boxPublicKey.length).toBe(32);
      expect(loaded!.boxSecretKey.length).toBe(32);
      // Verify box keys were persisted
      const reloaded = loadIdentity();
      expect(toHex(reloaded!.boxPublicKey)).toBe(toHex(loaded!.boxPublicKey));
    });
  });

  describe("getOrCreateIdentity", () => {
    it("creates a new identity if none exists", () => {
      const identity = getOrCreateIdentity();
      expect(identity.publicKey.length).toBe(32);
      // Should also persist it
      const loaded = loadIdentity();
      expect(loaded).not.toBeNull();
      expect(toHex(loaded!.publicKey)).toBe(toHex(identity.publicKey));
    });

    it("returns existing identity if one exists", () => {
      const first = getOrCreateIdentity();
      const second = getOrCreateIdentity();
      expect(toHex(first.publicKey)).toBe(toHex(second.publicKey));
    });
  });

  describe("signMessage", () => {
    // Note: In jsdom, TextEncoder.encode() may return a Buffer-like object.
    // We ensure Uint8Array by wrapping. The signMessage function works correctly
    // in a real browser environment.

    it("produces a valid Ed25519 signature", () => {
      const keyPair = nacl.sign.keyPair();
      const sk = new Uint8Array(keyPair.secretKey);
      const message = "hello world";
      const sigHex = signMessage(message, sk);

      // Signature should be 64 bytes = 128 hex chars
      expect(sigHex.length).toBe(128);

      // Verify the signature
      const sigBytes = new Uint8Array(fromHex(sigHex));
      const msgBytes = new Uint8Array(new TextEncoder().encode(message));
      const valid = nacl.sign.detached.verify(msgBytes, sigBytes, new Uint8Array(keyPair.publicKey));
      expect(valid).toBe(true);
    });

    it("different messages produce different signatures", () => {
      const keyPair = nacl.sign.keyPair();
      const sk = new Uint8Array(keyPair.secretKey);
      const sig1 = signMessage("msg1", sk);
      const sig2 = signMessage("msg2", sk);
      expect(sig1).not.toBe(sig2);
    });

    it("wrong key fails verification", () => {
      const kp1 = nacl.sign.keyPair();
      const kp2 = nacl.sign.keyPair();
      const message = "secret";
      const sigHex = signMessage(message, new Uint8Array(kp1.secretKey));
      const sigBytes = new Uint8Array(fromHex(sigHex));
      const msgBytes = new Uint8Array(new TextEncoder().encode(message));
      // Verify with wrong public key should fail
      const valid = nacl.sign.detached.verify(msgBytes, sigBytes, new Uint8Array(kp2.publicKey));
      expect(valid).toBe(false);
    });
  });

  describe("getPublicKeyHex", () => {
    it("returns hex-encoded public key", () => {
      const identity = generateIdentity();
      const hex = getPublicKeyHex(identity);
      expect(hex.length).toBe(64); // 32 bytes = 64 hex chars
      expect(/^[0-9a-f]+$/.test(hex)).toBe(true);
    });
  });

  describe("getBoxPublicKeyHex", () => {
    it("returns hex-encoded box public key", () => {
      const identity = generateIdentity();
      const hex = getBoxPublicKeyHex(identity);
      expect(hex.length).toBe(64); // 32 bytes = 64 hex chars
      expect(/^[0-9a-f]+$/.test(hex)).toBe(true);
    });
  });

  describe("encryptDM / decryptDM", () => {
    it("encrypts and decrypts a message between two identities", () => {
      const alice = generateIdentity();
      const bob = generateIdentity();

      const plaintext = "Hello Bob, this is a secret message!";
      const aliceBoxPKHex = getBoxPublicKeyHex(alice);
      const bobBoxPKHex = getBoxPublicKeyHex(bob);

      // Alice encrypts for Bob
      const { ciphertext, nonce } = encryptDM(plaintext, bobBoxPKHex, alice);
      expect(ciphertext).toBeTruthy();
      expect(nonce).toBeTruthy();
      // Ciphertext should not contain the plaintext
      expect(ciphertext).not.toContain(plaintext);

      // Bob decrypts using Alice's box public key
      const decrypted = decryptDM(ciphertext, nonce, aliceBoxPKHex, bob);
      expect(decrypted).toBe(plaintext);
    });

    it("fails to decrypt with wrong key", () => {
      const alice = generateIdentity();
      const bob = generateIdentity();
      const charlie = generateIdentity();

      const plaintext = "Secret for Bob only";
      const bobBoxPKHex = getBoxPublicKeyHex(bob);
      const aliceBoxPKHex = getBoxPublicKeyHex(alice);

      // Alice encrypts for Bob
      const { ciphertext, nonce } = encryptDM(plaintext, bobBoxPKHex, alice);

      // Charlie tries to decrypt (should fail)
      const result = decryptDM(ciphertext, nonce, aliceBoxPKHex, charlie);
      expect(result).toBeNull();
    });

    it("handles unicode messages", () => {
      const alice = generateIdentity();
      const bob = generateIdentity();

      const plaintext = "Bonjour! Les emojis: \u{1F600}\u{1F389}\u{1F680}";
      const { ciphertext, nonce } = encryptDM(plaintext, getBoxPublicKeyHex(bob), alice);
      const decrypted = decryptDM(ciphertext, nonce, getBoxPublicKeyHex(alice), bob);
      expect(decrypted).toBe(plaintext);
    });

    it("produces different ciphertexts for same plaintext (random nonce)", () => {
      const alice = generateIdentity();
      const bob = generateIdentity();

      const plaintext = "Same message";
      const bobBoxPKHex = getBoxPublicKeyHex(bob);
      const enc1 = encryptDM(plaintext, bobBoxPKHex, alice);
      const enc2 = encryptDM(plaintext, bobBoxPKHex, alice);
      expect(enc1.ciphertext).not.toBe(enc2.ciphertext);
      expect(enc1.nonce).not.toBe(enc2.nonce);
    });

    it("sender can also decrypt their own message using recipient box pk", () => {
      const alice = generateIdentity();
      const bob = generateIdentity();

      const plaintext = "I should be able to read my own message";
      const bobBoxPKHex = getBoxPublicKeyHex(bob);

      // Alice encrypts for Bob
      const { ciphertext, nonce } = encryptDM(plaintext, bobBoxPKHex, alice);

      // Alice decrypts using Bob's box public key (sender side)
      const decrypted = decryptDM(ciphertext, nonce, bobBoxPKHex, alice);
      expect(decrypted).toBe(plaintext);
    });
  });
});

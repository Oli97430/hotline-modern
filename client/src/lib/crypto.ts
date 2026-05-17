import nacl from "tweetnacl";
import { encodeBase64, decodeBase64 } from "tweetnacl-util";

const STORAGE_KEY = "hotline-identity";

export interface Identity {
  publicKey: Uint8Array;   // Ed25519 signing public key
  secretKey: Uint8Array;   // Ed25519 signing secret key
  boxPublicKey: Uint8Array; // Curve25519 encryption public key
  boxSecretKey: Uint8Array; // Curve25519 encryption secret key
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

export function generateIdentity(): Identity {
  const signKP = nacl.sign.keyPair();
  const boxKP = nacl.box.keyPair();
  return {
    publicKey: signKP.publicKey,
    secretKey: signKP.secretKey,
    boxPublicKey: boxKP.publicKey,
    boxSecretKey: boxKP.secretKey,
  };
}

export function saveIdentity(identity: Identity): void {
  const data = {
    publicKey: encodeBase64(identity.publicKey),
    secretKey: encodeBase64(identity.secretKey),
    boxPublicKey: encodeBase64(identity.boxPublicKey),
    boxSecretKey: encodeBase64(identity.boxSecretKey),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadIdentity(): Identity | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    // Backward compatibility: generate box keys if missing
    let boxPublicKey: Uint8Array;
    let boxSecretKey: Uint8Array;
    if (data.boxPublicKey && data.boxSecretKey) {
      boxPublicKey = decodeBase64(data.boxPublicKey);
      boxSecretKey = decodeBase64(data.boxSecretKey);
    } else {
      const boxKP = nacl.box.keyPair();
      boxPublicKey = boxKP.publicKey;
      boxSecretKey = boxKP.secretKey;
      // Persist the newly generated box keys
      data.boxPublicKey = encodeBase64(boxPublicKey);
      data.boxSecretKey = encodeBase64(boxSecretKey);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return {
      publicKey: decodeBase64(data.publicKey),
      secretKey: decodeBase64(data.secretKey),
      boxPublicKey,
      boxSecretKey,
    };
  } catch {
    return null;
  }
}

export function getOrCreateIdentity(): Identity {
  const existing = loadIdentity();
  if (existing) return existing;
  const identity = generateIdentity();
  saveIdentity(identity);
  return identity;
}

/**
 * Encrypt a DM message for a specific peer using NaCl box (Curve25519 + XSalsa20-Poly1305).
 * Returns base64-encoded ciphertext and nonce.
 */
export function encryptDM(
  plaintext: string,
  peerBoxPublicKeyHex: string,
  identity: Identity
): { ciphertext: string; nonce: string } {
  const peerBoxPK = fromHex(peerBoxPublicKeyHex);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageBytes = new TextEncoder().encode(plaintext);
  const encrypted = nacl.box(messageBytes, nonce, peerBoxPK, identity.boxSecretKey);
  if (!encrypted) throw new Error("Encryption failed");
  return {
    ciphertext: encodeBase64(encrypted),
    nonce: encodeBase64(nonce),
  };
}

/**
 * Decrypt a DM message from a specific peer using NaCl box.
 * Returns the plaintext string, or null if decryption fails.
 */
export function decryptDM(
  ciphertextBase64: string,
  nonceBase64: string,
  peerBoxPublicKeyHex: string,
  identity: Identity
): string | null {
  try {
    const ciphertext = decodeBase64(ciphertextBase64);
    const nonce = decodeBase64(nonceBase64);
    const peerBoxPK = fromHex(peerBoxPublicKeyHex);
    const decrypted = nacl.box.open(ciphertext, nonce, peerBoxPK, identity.boxSecretKey);
    if (!decrypted) return null;
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

/**
 * Get the hex-encoded Curve25519 box public key for sharing with peers.
 */
export function getBoxPublicKeyHex(identity: Identity): string {
  return toHex(identity.boxPublicKey);
}

export function signMessage(message: string, secretKey: Uint8Array): string {
  const messageBytes = new TextEncoder().encode(message);
  const signature = nacl.sign.detached(messageBytes, secretKey);
  return toHex(signature);
}

export function getPublicKeyHex(identity: Identity): string {
  return toHex(identity.publicKey);
}

/**
 * Generate auth headers for HTTP file requests.
 * Signs "publicKey:timestamp" for replay protection (60s validity window).
 */
export function getFileAuthHeaders(identity: Identity): Record<string, string> {
  const pk = toHex(identity.publicKey);
  const timestamp = Date.now().toString();
  const message = `${pk}:${timestamp}`;
  const signature = signMessage(message, identity.secretKey);
  return {
    "X-Hotline-PublicKey": pk,
    "X-Hotline-Signature": signature,
    "X-Hotline-Timestamp": timestamp,
  };
}

export { toHex, fromHex };

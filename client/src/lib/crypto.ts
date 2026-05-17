import nacl from "tweetnacl";
import { encodeBase64, decodeBase64 } from "tweetnacl-util";

const STORAGE_KEY = "hotline-identity";

export interface Identity {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
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
  const keyPair = nacl.sign.keyPair();
  return {
    publicKey: keyPair.publicKey,
    secretKey: keyPair.secretKey,
  };
}

export function saveIdentity(identity: Identity): void {
  const data = {
    publicKey: encodeBase64(identity.publicKey),
    secretKey: encodeBase64(identity.secretKey),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadIdentity(): Identity | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return {
      publicKey: decodeBase64(data.publicKey),
      secretKey: decodeBase64(data.secretKey),
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

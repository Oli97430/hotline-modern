import { describe, it, expect, beforeEach } from "vitest";
import {
  generateIdentity,
  saveIdentity,
  loadIdentity,
  getOrCreateIdentity,
  signMessage,
  getPublicKeyHex,
  toHex,
  fromHex,
} from "../lib/crypto";
import nacl from "tweetnacl";

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
    it("creates a valid Ed25519 keypair", () => {
      const identity = generateIdentity();
      expect(identity.publicKey).toBeInstanceOf(Uint8Array);
      expect(identity.secretKey).toBeInstanceOf(Uint8Array);
      expect(identity.publicKey.length).toBe(32);
      expect(identity.secretKey.length).toBe(64);
    });

    it("generates unique keypairs", () => {
      const id1 = generateIdentity();
      const id2 = generateIdentity();
      expect(toHex(id1.publicKey)).not.toBe(toHex(id2.publicKey));
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
    });

    it("returns null when no identity is stored", () => {
      expect(loadIdentity()).toBeNull();
    });

    it("returns null on corrupted data", () => {
      localStorage.setItem("hotline-identity", "not-json");
      expect(loadIdentity()).toBeNull();
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
});

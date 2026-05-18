import { useState } from "react";
import { getOrCreateIdentity, getPublicKeyHex, type Identity } from "../lib/crypto";

export function useIdentity() {
  const [identity] = useState<Identity>(() => getOrCreateIdentity());

  return {
    identity,
    publicKeyHex: getPublicKeyHex(identity),
  };
}

import { useState } from "react";
import { Identity, getOrCreateIdentity, getPublicKeyHex } from "../lib/crypto";

export function useIdentity() {
  const [identity] = useState<Identity>(() => getOrCreateIdentity());

  return {
    identity,
    publicKeyHex: getPublicKeyHex(identity),
  };
}

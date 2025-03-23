"use client"; // Required for Next.js

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    MiniKit.install("app_86c222aabfa9b6c5fb0f22fd83e65c39");
    console.log(MiniKit.isInstalled());
  }, []);

  return <>{children}</>;
}

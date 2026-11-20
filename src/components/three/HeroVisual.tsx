"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useDeviceTier } from "@/lib/useDeviceTier";
import { HeroStatic } from "./HeroStatic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Sceglie fra scena 3D e versione statica; la statica resta visibile finché il 3D non è pronto. */
export function HeroVisual() {
  const tier = useDeviceTier();
  const [ready, setReady] = useState(false);
  const showStatic = tier !== "full" || !ready;

  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showStatic ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!showStatic}
      >
        <HeroStatic className="w-[92%] max-w-[640px] drop-shadow-2xl" />
      </div>
      {tier === "full" && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene onReady={() => window.setTimeout(() => setReady(true), 150)} />
        </div>
      )}
    </div>
  );
}

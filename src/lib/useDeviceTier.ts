"use client";

import { useEffect, useState } from "react";

export type Tier = "pending" | "static" | "full";

/** Decide se mostrare la scena 3D o l'alternativa statica. */
export function useDeviceTier(): Tier {
  const [tier, setTier] = useState<Tier>("pending");

  useEffect(() => {
    // Override manuale per presentazioni e test: ?3d=1 forza il 3D, ?3d=0 la versione statica
    const force = new URLSearchParams(window.location.search).get("3d");
    if (force === "1" || force === "0") {
      setTier(force === "1" ? "full" : "static");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowCpu = (nav.hardwareConcurrency ?? 8) < 4;
    const lowMem = (nav.deviceMemory ?? 8) < 4;
    const saveData = nav.connection?.saveData === true;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setTier(reduced || lowCpu || lowMem || saveData || !webgl ? "static" : "full");
  }, []);

  return tier;
}

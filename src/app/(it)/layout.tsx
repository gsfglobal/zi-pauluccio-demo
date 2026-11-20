import type { ReactNode } from "react";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export default function ItLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="it">{children}</SiteShell>;
}

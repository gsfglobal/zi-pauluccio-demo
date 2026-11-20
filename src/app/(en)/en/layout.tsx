import type { ReactNode } from "react";
import "../../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}

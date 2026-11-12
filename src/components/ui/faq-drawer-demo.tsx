"use client";

import { FaqDrawer } from "@/components/ui/faq-drawer";

export default function FaqDrawerDemo() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FaqDrawer style={{ flex: 1 }} />
    </div>
  );
}

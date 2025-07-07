"use client";

import dynamic from "next/dynamic";

// Dynamically load the Client-only Editor with SSR disabled
const Editor = dynamic(() => import("@repo/editor").then((mod) => mod.Editor), {
  ssr: false,
});

export default function EditorClientWrapper() {
  return <Editor />;
}
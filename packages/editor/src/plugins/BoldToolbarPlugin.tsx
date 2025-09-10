"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function BoldToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onBoldClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  return (
    <button
      type="button"
      onClick={onBoldClick}
      className="px-2 py-1 text-sm rounded border bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      aria-label="Toggle bold"
      title="Bold (Ctrl/Cmd + B)"
    >
      <span className="font-bold">B</span>
    </button>
  );
}

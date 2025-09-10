"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function ItalicToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onItalicClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  return (
    <button
      type="button"
      onClick={onItalicClick}
      className="px-2 py-1 text-sm rounded border bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      aria-label="Toggle italic"
      title="Italic (Ctrl/Cmd + I)"
    >
      <span className="italic">I</span>
    </button>
  );
}

"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function UnderlineToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onUnderlineClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  }, [editor]);

  return (
    <button
      type="button"
      onClick={onUnderlineClick}
      className="px-2 py-1 text-sm rounded border bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      aria-label="Toggle underline"
      title="Underline (Ctrl/Cmd + U)"
    >
      <span className="underline">U</span>
    </button>
  );
}

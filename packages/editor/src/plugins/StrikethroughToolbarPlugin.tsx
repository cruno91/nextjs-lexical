"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function StrikethroughToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onStrikeClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
  }, [editor]);

  return (
    <button
      type="button"
      onClick={onStrikeClick}
      className="px-2 py-1 text-sm rounded border bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      aria-label="Toggle strikethrough"
      title="Strikethrough"
    >
      <span className="line-through">S</span>
    </button>
  );
}

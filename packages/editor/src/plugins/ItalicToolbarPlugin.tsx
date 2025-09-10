"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Button } from "@repo/ui/components/ui/button";

export function ItalicToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onItalicClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  return (
    <Button
      type="button"
      onClick={onItalicClick}
      size="sm"
      variant="ghost"
      aria-label="Toggle italic"
      title="Italic (Ctrl/Cmd + I)"
    >
      <span className="italic">I</span>
    </Button>
  );
}

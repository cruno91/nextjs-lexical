"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Button } from "@repo/ui/components/ui/button";

export function UnderlineToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onUnderlineClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  }, [editor]);

  return (
    <Button
      type="button"
      onClick={onUnderlineClick}
      size="sm"
      variant="ghost"
      aria-label="Toggle underline"
      title="Underline (Ctrl/Cmd + U)"
    >
      <span className="underline">U</span>
    </Button>
  );
}

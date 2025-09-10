"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Button } from "@repo/ui/components/ui/button";

export function BoldToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onBoldClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  return (
    <Button
      type="button"
      onClick={onBoldClick}
      size="sm"
      variant="ghost"
      aria-label="Toggle bold"
      title="Bold (Ctrl/Cmd + B)"
    >
      <span className="font-bold">B</span>
    </Button>
  );
}

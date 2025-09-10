"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Button } from "@repo/ui/components/ui/button";

export function StrikethroughToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onStrikeClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
  }, [editor]);

  return (
    <Button
      type="button"
      onClick={onStrikeClick}
      variant="ghost"
      size="sm"
      aria-label="Toggle strikethrough"
      title="Strikethrough"
      className="h-8"
    >
      <span className="line-through">S</span>
    </Button>
  );
}

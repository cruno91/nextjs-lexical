"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { Button } from "@repo/ui/components/ui/button";
import { $createThreeUpNode } from "../nodes/ThreeUpNode";

export function ThreeUpToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onInsert = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([$createThreeUpNode()]);
      }
    });
  }, [editor]);

  return (
    <Button
      type="button"
      onClick={onInsert}
      size="sm"
      variant="ghost"
      title="Insert 3-up cards"
      aria-label="Insert 3-up cards"
    >
      3 Up
    </Button>
  );
}

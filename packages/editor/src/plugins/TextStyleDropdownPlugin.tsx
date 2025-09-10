"use client";

import { ChangeEvent, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

const OPTIONS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "h1", label: "H1" },
  { value: "h2", label: "H2" },
  { value: "h3", label: "H3" },
  { value: "h4", label: "H4" },
  { value: "superscript", label: "Superscript" },
  { value: "subscript", label: "Subscript" },
] as const;

type OptionValue = typeof OPTIONS[number]["value"];

export function TextStyleDropdownPlugin() {
  const [editor] = useLexicalComposerContext();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as OptionValue;

      if (value === "superscript" || value === "subscript") {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, value);
        return;
      }

      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (value === "paragraph") {
            $setBlocksType(selection, () => $createParagraphNode());
          } else {
            $setBlocksType(selection, () =>
              $createHeadingNode(value as "h1" | "h2" | "h3" | "h4")
            );
          }
        }
      });
    },
    [editor]
  );

  return (
    <select
      onChange={onChange}
      defaultValue="paragraph"
      className="h-8 px-2 text-sm rounded-md border border-input bg-background text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Text style"
      title="Text style"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

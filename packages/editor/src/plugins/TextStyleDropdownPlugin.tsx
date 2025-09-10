"use client";

import { useCallback, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import theme from "../EditorTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Button } from "@repo/ui/components/ui/button";

const OPTIONS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "h4", label: "Heading 4" },
  { value: "superscript", label: "Superscript" },
  { value: "subscript", label: "Subscript" },
] as const;

type OptionValue = (typeof OPTIONS)[number]["value"];

export function TextStyleDropdownPlugin() {
  const [editor] = useLexicalComposerContext();
  const [current, setCurrent] = useState<OptionValue>("paragraph");

  const applyValue = useCallback(
    (value: OptionValue) => {
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

  const label = useMemo(() => {
    const found = OPTIONS.find((o) => o.value === current);
    return found ? found.label : "Text style";
  }, [current]);

  const renderPreview = (value: OptionValue, label: string) => {
    switch (value) {
      case "h1":
        return <div className={theme.heading.h1}>Heading 1</div>;
      case "h2":
        return <div className={theme.heading.h2}>Heading 2</div>;
      case "h3":
        return <div className={theme.heading.h3}>Heading 3</div>;
      case "h4":
        return <div className={theme.heading.h4}>Heading 4</div>;
      case "superscript":
        return (
          <div className="text-sm">
            x<sup className="align-super text-xs">2</sup> (Superscript)
          </div>
        );
      case "subscript":
        return (
          <div className="text-sm">
            H<sub className="align-sub text-xs">2</sub>O (Subscript)
          </div>
        );
      case "paragraph":
      default:
        return <div className="text-base leading-relaxed">{label}</div>;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" aria-label="Text style" title="Text style">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => {
              setCurrent(opt.value);
              applyValue(opt.value);
            }}
          >
            {renderPreview(opt.value, opt.label)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

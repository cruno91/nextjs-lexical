"use client";

import { useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getSelection, $isRangeSelection } from "lexical";
import { $createLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import theme from "../EditorTheme";
import { $createButtonLinkNode } from "../nodes/ButtonLinkNode";

export function LinkStylesPlugin() {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"link" | "button">("link");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  // Prefill text from current selection when opening
  useEffect(() => {
    if (open) {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) && !selection.isCollapsed()) {
          const selectedText = selection.getTextContent();
          setText((t) => (t ? t : selectedText));
        }
      });
    } else {
      // reset when closed
      setMode("link");
      setText("");
      setUrl("");
    }
  }, [open, editor]);

  const canSubmit = useMemo(() => {
    return text.trim().length > 0 && /^https?:\/\//i.test(url.trim());
  }, [text, url]);

  const onInsert = () => {
    if (!canSubmit) return;

    const cleanText = text.trim();
    const cleanUrl = url.trim();

    editor.update(() => {
      const selection = $getSelection();
      if (mode === "link") {
        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            const linkNode = $createLinkNode(cleanUrl);
            linkNode.append($createTextNode(cleanText));
            selection.insertNodes([linkNode]);
          } else {
            // If user provided custom text, replace selection text first
            if (cleanText !== selection.getTextContent()) {
              selection.insertText(cleanText);
            }
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, cleanUrl);
          }
        }
      } else {
        // button mode
        if ($isRangeSelection(selection)) {
          const node = $createButtonLinkNode(cleanUrl, cleanText);
          selection.insertNodes([node]);
        }
      }
    });

    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="sm" variant="ghost" title="Insert link or button">
            Link
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuItem
            onClick={() => {
              setMode("link");
              setOpen(true);
            }}
          >
            <div className="flex w-full items-center justify-between gap-3">
              <span className="text-sm">Standard link</span>
              <span className={theme.link}>example.com</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("button");
              setOpen(true);
            }}
          >
            <div className="flex w-full items-center justify-between gap-3">
              <span className="text-sm">Button link</span>
              <span className={buttonVariants({ size: "sm" })}>Link</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="link-mode"
                  value="link"
                  checked={mode === "link"}
                  onChange={() => setMode("link")}
                />
                Standard link
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="link-mode"
                  value="button"
                  checked={mode === "button"}
                  onChange={() => setMode("button")}
                />
                Button (uses @repo/ui Button)
              </label>
            </div>
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="link-text">Text</label>
              <Input id="link-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Link text" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="link-url">URL</label>
              <Input id="link-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} type="button">Cancel</Button>
            <Button onClick={onInsert} type="button" disabled={!canSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

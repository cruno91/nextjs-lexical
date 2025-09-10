"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import theme from "./EditorTheme";
import { BoldToolbarPlugin } from "./plugins/BoldToolbarPlugin";
import { ItalicToolbarPlugin } from "./plugins/ItalicToolbarPlugin";
import { UnderlineToolbarPlugin } from "./plugins/UnderlineToolbarPlugin";
import { StrikethroughToolbarPlugin } from "./plugins/StrikethroughToolbarPlugin";
import { TextStyleDropdownPlugin } from "./plugins/TextStyleDropdownPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { ButtonLinkNode } from "./nodes/ButtonLinkNode";
import { LinkStylesPlugin } from "./plugins/LinkStylesPlugin";

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode, LinkNode, ButtonLinkNode],
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded-lg border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
        <div className="flex items-center gap-1 border-b bg-muted/50 p-2 rounded-t-lg">
          <TextStyleDropdownPlugin />
          <BoldToolbarPlugin />
          <ItalicToolbarPlugin />
          <UnderlineToolbarPlugin />
          <StrikethroughToolbarPlugin />
          <LinkStylesPlugin />
        </div>
        <div className="relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-[180px] p-4 outline-none leading-7 text-foreground" />}
            placeholder={<div className="pointer-events-none absolute left-4 top-4 text-muted-foreground">Start typing…</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
    </LexicalComposer>
  );
}

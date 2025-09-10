"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
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
import { ThreeUpNode } from "./nodes/ThreeUpNode";
import { LinkStylesPlugin } from "./plugins/LinkStylesPlugin";
import { ThreeUpToolbarPlugin } from "./plugins/ThreeUpToolbarPlugin";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode, LinkNode, ButtonLinkNode, ThreeUpNode],
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Card className="w-full">
        <CardHeader className="border-b">
          <div className="flex items-center flex-wrap gap-1.5">
            <TextStyleDropdownPlugin />
            <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />
            <BoldToolbarPlugin />
            <ItalicToolbarPlugin />
            <UnderlineToolbarPlugin />
            <StrikethroughToolbarPlugin />
            <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />
            <LinkStylesPlugin />
            <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />
            <ThreeUpToolbarPlugin />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="min-h-40 w-full resize-none rounded-md bg-background px-3 py-2 text-base leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              }
              placeholder={
                <div className="pointer-events-none absolute left-3 top-2 select-none text-muted-foreground/70">
                  Start typing…
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin />
        </CardContent>
      </Card>
    </LexicalComposer>
  );
}

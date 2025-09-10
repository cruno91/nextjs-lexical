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

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex items-center gap-2 mb-2 border-b pb-2">
        <TextStyleDropdownPlugin />
        <BoldToolbarPlugin />
        <ItalicToolbarPlugin />
        <UnderlineToolbarPlugin />
        <StrikethroughToolbarPlugin />
      </div>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder">Start typing…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}

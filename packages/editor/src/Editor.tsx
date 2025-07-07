"use client";

import {
  LexicalComposer,
  RichTextPlugin,
  ContentEditable,
  LexicalErrorBoundary
} from "@lexical/react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { MyButtonPlugin } from "./plugins/MyButtonPlugin";

const theme = {
  // define theme classes if needed
};

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder">Start typing…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      {/*<MyButtonPlugin />*/}
    </LexicalComposer>
  );
}

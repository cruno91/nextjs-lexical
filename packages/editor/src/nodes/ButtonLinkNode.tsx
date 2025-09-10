"use client";

import { DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode } from "lexical";
import * as React from "react";
import { Button } from "@repo/ui/components/ui/button";
import { JSX } from "react";

export type SerializedButtonLinkNode = {
  type: "button-link";
  version: 1;
  url: string;
  text: string;
} & SerializedLexicalNode;

export class ButtonLinkNode extends DecoratorNode<JSX.Element> {
  __url: string;
  __text: string;

  static getType(): string {
    return "button-link";
  }

  static clone(node: ButtonLinkNode): ButtonLinkNode {
    return new ButtonLinkNode(node.__url, node.__text, node.__key);
  }

  constructor(url: string, text: string, key?: NodeKey) {
    super(key);
    this.__url = url;
    this.__text = text;
  }

  static importJSON(serializedNode: SerializedButtonLinkNode): ButtonLinkNode {
    const { url, text } = serializedNode;
    return new ButtonLinkNode(url, text);
  }

  exportJSON(): SerializedButtonLinkNode {
    return {
      type: "button-link",
      version: 1,
      url: this.__url,
      text: this.__text,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    // Mark for easier debugging
    span.setAttribute("data-lexical-button-link", "true");
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(_editor: LexicalEditor, _config: EditorConfig): JSX.Element {
    const url = this.__url;
    const text = this.__text;
    return (
      <Button asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </Button>
    );
  }
}

export function $createButtonLinkNode(url: string, text: string): ButtonLinkNode {
  return new ButtonLinkNode(url, text);
}

export function $isButtonLinkNode(node?: LexicalNode | null): node is ButtonLinkNode {
  return node instanceof ButtonLinkNode;
}

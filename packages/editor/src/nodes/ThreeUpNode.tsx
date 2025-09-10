"use client";

import {
  DecoratorNode,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  $getNodeByKey,
} from "lexical";
import * as React from "react";
import { JSX } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

export type ThreeUpItem = {
  imageUrl: string;
  title: string;
  date: string;
};

export type SerializedThreeUpNode = {
  type: "three-up";
  version: 1;
  items: [ThreeUpItem, ThreeUpItem, ThreeUpItem];
} & SerializedLexicalNode;

export class ThreeUpNode extends DecoratorNode<JSX.Element> {
  __items: [ThreeUpItem, ThreeUpItem, ThreeUpItem];

  static getType(): string {
    return "three-up";
  }

  static clone(node: ThreeUpNode): ThreeUpNode {
    return new ThreeUpNode(node.__items, node.__key);
  }

  constructor(items: [ThreeUpItem, ThreeUpItem, ThreeUpItem], key?: NodeKey) {
    super(key);
    this.__items = items;
  }

  static importJSON(serializedNode: SerializedThreeUpNode): ThreeUpNode {
    const { items } = serializedNode;
    return new ThreeUpNode(items);
  }

  exportJSON(): SerializedThreeUpNode {
    return {
      type: "three-up",
      version: 1,
      items: this.__items,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    span.setAttribute("data-lexical-three-up", "true");
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(editor: LexicalEditor, _config: EditorConfig): JSX.Element {
    return (
      <ThreeUpComponent items={this.__items} nodeKey={this.getKey()} editor={editor} />
    );
  }
}

function ThreeUpComponent({
  items,
  nodeKey,
  editor,
}: {
  items: [ThreeUpItem, ThreeUpItem, ThreeUpItem];
  nodeKey: NodeKey;
  editor: LexicalEditor;
}) {
  const [editing, setEditing] = React.useState<number | null>(null);

  const updateItem = React.useCallback(
    (idx: 0 | 1 | 2, patch: Partial<ThreeUpItem>) => {
      editor.update(() => {
        const node = $getNodeByKey<ThreeUpNode>(nodeKey);
        if (node instanceof ThreeUpNode) {
          const writable = node.getWritable();
          const newItems = writable.__items.slice() as [
            ThreeUpItem,
            ThreeUpItem,
            ThreeUpItem
          ];
          newItems[idx] = { ...newItems[idx], ...patch };
          writable.__items = newItems;
        }
      });
    },
    [editor, nodeKey]
  );

  return (
    <div className="not-prose">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, idx) => (
          <Card key={idx} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-[3/2] w-full overflow-hidden bg-muted">
                {/* Using standard img tag to avoid Next.js dependency here */}
                <img
                  src={item.imageUrl}
                  alt={item.title || `Card image ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute right-2 top-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditing(editing === idx ? null : idx)}
                >
                  {editing === idx ? "Done" : "Edit"}
                </Button>
              </div>
            </div>
            <CardContent className="space-y-1 py-4">
              <div className="text-sm text-muted-foreground">{item.date}</div>
              <div className="text-base font-medium leading-tight">{item.title}</div>
              {editing === idx && (
                <div className="mt-3 grid gap-2 border-t pt-3">
                  <label className="grid gap-1 text-sm">
                    <span>Image URL</span>
                    <Input
                      value={item.imageUrl}
                      onChange={(e) =>
                        updateItem(idx as 0 | 1 | 2, { imageUrl: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>Date</span>
                    <Input
                      value={item.date}
                      onChange={(e) =>
                        updateItem(idx as 0 | 1 | 2, { date: e.target.value })
                      }
                      placeholder="Jan 1, 2025"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>Title</span>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        updateItem(idx as 0 | 1 | 2, { title: e.target.value })
                      }
                      placeholder="Card title"
                    />
                  </label>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function $createThreeUpNode(
  items?: [ThreeUpItem, ThreeUpItem, ThreeUpItem]
): ThreeUpNode {
  const defaults: [ThreeUpItem, ThreeUpItem, ThreeUpItem] = [
    {
      imageUrl: "https://picsum.photos/seed/one/800/534",
      title: "Card title one",
      date: "Jan 1, 2025",
    },
    {
      imageUrl: "https://picsum.photos/seed/two/800/534",
      title: "Card title two",
      date: "Jan 2, 2025",
    },
    {
      imageUrl: "https://picsum.photos/seed/three/800/534",
      title: "Card title three",
      date: "Jan 3, 2025",
    },
  ];
  return new ThreeUpNode(items ?? defaults);
}

export function $isThreeUpNode(node?: LexicalNode | null): node is ThreeUpNode {
  return node instanceof ThreeUpNode;
}

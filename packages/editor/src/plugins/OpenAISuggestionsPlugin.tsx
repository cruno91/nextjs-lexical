"use client";

import { useCallback, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@repo/ui/components/ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@repo/ui/components/ui/tooltip";
import { Sparkles, Loader2 } from "lucide-react";
import { OpenAISuggestionsPluginProps } from "../types/openai";
import { generateSuggestion } from "../utils/openai";

export function OpenAISuggestionsPlugin({ config }: OpenAISuggestionsPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = useCallback(async (promptId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get current HTML content from editor
      let htmlContent = '';
      editor.getEditorState().read(() => {
        htmlContent = $generateHtmlFromNodes(editor, null);
      });

      if (!htmlContent.trim()) {
        setError('No content to process');
        return;
      }

      // Generate suggestion
      const result = await generateSuggestion(promptId, htmlContent, config);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Update editor with suggested content
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        // Parse the HTML and insert into editor
        const parser = new DOMParser();
        const doc = parser.parseFromString(result.revisedHTML, 'text/html');
        const nodes = $generateNodesFromDOM(editor, doc);

        nodes.forEach(node => {
          root.append(node);
        });
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [editor, config]);

  if (config.prompts.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={isLoading}
                aria-label="AI Suggestions"
                title="AI Content Suggestions"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI Content Suggestions</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="start" className="w-56">
          {config.prompts.map((prompt) => (
            <DropdownMenuItem
              key={prompt.id}
              onClick={() => handleSuggestion(prompt.id)}
              disabled={isLoading}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {prompt.name}
            </DropdownMenuItem>
          ))}

          {config.helpText && (
            <>
              <DropdownMenuSeparator />
              <div 
                className="px-2 py-1.5 text-xs text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: config.helpText }}
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <div className="absolute top-full left-0 mt-1 p-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md z-10">
          {error}
        </div>
      )}
    </TooltipProvider>
  );
}

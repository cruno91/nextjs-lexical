export interface OpenAIPrompt {
  id: string;
  name: string;
  prompt: string;
}

export interface OpenAIConfig {
  apiKey?: string;
  model: string;
  prompts: OpenAIPrompt[];
  helpText?: string;
}

export interface OpenAISuggestionResponse {
  revisedHTML: string;
  error?: string;
}

export interface OpenAISuggestionsPluginProps {
  config: OpenAIConfig;
}

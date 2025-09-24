import OpenAI from 'openai';
import { OpenAIConfig, OpenAISuggestionResponse } from '../types/openai';

export async function generateSuggestion(
  promptId: string,
  htmlContent: string,
  config: OpenAIConfig
): Promise<OpenAISuggestionResponse> {
  try {
    if (!config.apiKey) {
      return {
        revisedHTML: htmlContent,
        error: 'OpenAI API key is not configured'
      };
    }

    // Find the prompt by ID
    const prompt = config.prompts.find(p => p.id === promptId);
    if (!prompt) {
      return {
        revisedHTML: htmlContent,
        error: 'Prompt not found'
      };
    }

    // Replace MARKUP_PLACEHOLDER placeholder with instructions and content
    const fullPrompt = prompt.prompt.replace(
      'MARKUP_PLACEHOLDER',
      ' Use this HTML markup:\n' + htmlContent + '\n\nEnsure that the returned content is only valid HTML and does not contain additional characters, data, content or messaging, which when copied directly would not validate as valid HTML markup.'
    );

    const client = new OpenAI({
      apiKey: config.apiKey,
    });

    const result = await client.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    let revisedHTML = result.choices[0]?.message?.content || htmlContent;

    // Clean up any code block markers
    revisedHTML = revisedHTML.replace(/```html/g, '');
    revisedHTML = revisedHTML.replace(/```/g, '');

    return {
      revisedHTML: revisedHTML.trim()
    };

  } catch (error) {
    console.error('OpenAI suggestion error:', error);
    return {
      revisedHTML: htmlContent,
      error: error instanceof Error ? error.message : 'An error occurred'
    };
  }
}

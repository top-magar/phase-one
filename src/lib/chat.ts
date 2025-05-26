import OpenAI from 'openai';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<string> {
  try {
    const response = await deepseek.chat.completions.create({
      model: options.model || 'deepseek-chat',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content in response');
    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get response from DeepSeek: ${error.message}`);
    }
    throw new Error('Failed to get response from DeepSeek');
  }
} 
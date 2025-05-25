import { config } from '../config/config';
import MCPService from './mcpService';
import { sendMessageToGemini } from './geminiService';
import { Message } from '../types';

interface ChatResponse {
  text: string;
  suggestions?: string[];
  toolCalls?: any[];
}

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | Array<any>;
}

class ChatService {
  private mcpService?: MCPService;
  private conversationHistory: AnthropicMessage[] = [];

  constructor() {
    if (config.features.useMCP) {
      this.mcpService = new MCPService(
        config.anthropic.apiKey,
        config.n8n.sseUrl,
        config.n8n.authToken
      );
    }
  }

  async sendMessage(message: string, messages: Message[]): Promise<ChatResponse> {
    if (config.features.useMCP && this.mcpService) {
      // Convert Message[] to AnthropicMessage[] for MCP
      this.conversationHistory = messages
        .filter(msg => msg.sender !== 'system') // Filter out system messages
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        }));

      try {
        const response = await this.mcpService.sendMessage(message, this.conversationHistory);
        return response;
      } catch (error) {
        console.error('MCP service error, falling back to Gemini:', error);
        // Fallback to Gemini if MCP fails
        if (config.features.useGemini) {
          return await sendMessageToGemini(message);
        }
        throw error;
      }
    } else if (config.features.useGemini) {
      // Use existing Gemini service
      return await sendMessageToGemini(message);
    } else {
      throw new Error('No chat service configured. Please enable either MCP or Gemini.');
    }
  }

  // Method to get service status
  getServiceStatus(): { service: string; configured: boolean } {
    if (config.features.useMCP) {
      return {
        service: 'MCP (Anthropic + n8n)',
        configured: !!config.anthropic.apiKey && !!config.n8n.sseUrl
      };
    } else if (config.features.useGemini) {
      return {
        service: 'Gemini',
        configured: !!import.meta.env.VITE_GEMINI_API_KEY
      };
    }
    return {
      service: 'None',
      configured: false
    };
  }
}

// Export singleton instance
export const chatService = new ChatService(); 
interface MCPServer {
  type: 'url';
  url: string;
  name: string;
  authorization_token?: string;
  tool_configuration?: {
    enabled?: boolean;
    allowed_tools?: string[];
  };
}

interface MCPToolUse {
  type: 'mcp_tool_use';
  id: string;
  name: string;
  server_name: string;
  input: Record<string, any>;
}

interface MCPToolResult {
  type: 'mcp_tool_result';
  tool_use_id: string;
  is_error: boolean;
  content: Array<{
    type: string;
    text?: string;
  }>;
}

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'mcp_tool_use' | 'mcp_tool_result';
    text?: string;
    [key: string]: any;
  }>;
}

interface MCPResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text?: string;
    [key: string]: any;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: null | string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

class MCPService {
  private apiKey: string;
  private mcpServers: MCPServer[];
  private apiUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string, n8nSSEUrl: string, n8nAuthToken?: string) {
    this.apiKey = apiKey;
    this.mcpServers = [
      {
        type: 'url',
        url: n8nSSEUrl,
        name: 'n8n-project-management',
        authorization_token: n8nAuthToken,
        tool_configuration: {
          enabled: true
        }
      }
    ];
  }

  async sendMessage(
    message: string,
    conversationHistory: AnthropicMessage[] = []
  ): Promise<{ text: string; toolCalls?: MCPToolUse[]; suggestions?: string[] }> {
    try {
      const messages: AnthropicMessage[] = [
        ...conversationHistory,
        { role: 'user', content: message }
      ];

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'mcp-client-2025-04-04'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages,
          mcp_servers: this.mcpServers
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data: MCPResponse = await response.json();
      
      // Extract text content and tool calls
      let responseText = '';
      const toolCalls: MCPToolUse[] = [];
      
      for (const content of data.content) {
        if (content.type === 'text' && content.text) {
          responseText += content.text;
        } else if (content.type === 'mcp_tool_use') {
          toolCalls.push(content as MCPToolUse);
        }
      }

      // Extract suggestions from the response (similar to existing logic)
      const suggestions = this.extractSuggestions(responseText);

      return {
        text: responseText || 'I processed your request through the project management system.',
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        suggestions
      };

    } catch (error) {
      console.error('Error in MCP service:', error);
      throw error;
    }
  }

  private extractSuggestions(responseText: string): string[] {
    const suggestions: string[] = [];
    const suggestionMarkers = [
      "You could also ask:",
      "Here are some things you can do:",
      "Try asking about:"
    ];
    
    const lines = responseText.split('\n');
    let foundMarker = false;
    
    for (const line of lines) {
      if (suggestionMarkers.some(marker => line.includes(marker))) {
        foundMarker = true;
        continue;
      }
      if (foundMarker && line.trim().startsWith('- ')) {
        suggestions.push(line.trim().substring(2));
      } else if (foundMarker && line.trim() === "") {
        break;
      }
    }
    
    return suggestions;
  }

  // Method to handle tool results if needed for multi-turn conversations
  async handleToolResults(
    toolResults: MCPToolResult[],
    conversationHistory: AnthropicMessage[]
  ): Promise<{ text: string; suggestions?: string[] }> {
    const messages: AnthropicMessage[] = [
      ...conversationHistory,
      {
        role: 'assistant',
        content: toolResults
      }
    ];

    return this.sendMessage('', messages);
  }
}

export default MCPService; 
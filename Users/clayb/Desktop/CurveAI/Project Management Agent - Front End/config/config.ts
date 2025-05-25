// Configuration for the application
export const config = {
  // Anthropic API configuration
  anthropic: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  },
  
  // n8n MCP server configuration
  n8n: {
    sseUrl: import.meta.env.VITE_N8N_SSE_URL || '',
    authToken: import.meta.env.VITE_N8N_AUTH_TOKEN || '',
  },
  
  // Feature flags
  features: {
    useMCP: import.meta.env.VITE_USE_MCP === 'true',
    useGemini: import.meta.env.VITE_USE_GEMINI === 'true',
  }
};

// Validate configuration
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (config.features.useMCP) {
    if (!config.anthropic.apiKey) {
      errors.push('VITE_ANTHROPIC_API_KEY is required when using MCP');
    }
    if (!config.n8n.sseUrl) {
      errors.push('VITE_N8N_SSE_URL is required when using MCP');
    }
  }
  
  if (config.features.useGemini && !import.meta.env.VITE_GEMINI_API_KEY) {
    errors.push('VITE_GEMINI_API_KEY is required when using Gemini');
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    return false;
  }
  
  return true;
}; 
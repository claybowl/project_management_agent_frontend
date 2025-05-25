# n8n Setup for MCP Integration

This guide will help you set up your n8n workflow to work as an MCP server for the Curve AI frontend.

## Overview

The Model Context Protocol (MCP) allows Claude to connect to external tools through your n8n workflows. Your n8n instance will act as an MCP server, processing tool calls and returning results.

## Prerequisites

- n8n instance (self-hosted or cloud)
- HTTPS endpoint (required for MCP)
- Basic understanding of n8n workflows

## Setting Up the SSE Webhook

### 1. Create a New Workflow

Create a new workflow in n8n with the following nodes:

#### Webhook Node (Entry Point)
- **Webhook URL**: Will be generated automatically
- **Method**: POST
- **Response Mode**: Server-Sent Events (SSE)
- **Authentication**: Bearer Token (optional but recommended)

#### Function Node (Process MCP Request)
```javascript
// Parse the incoming MCP request
const body = $input.first().json;
const messages = body.messages || [];
const lastMessage = messages[messages.length - 1];

// Extract tool calls if any
const toolCalls = [];
if (lastMessage && lastMessage.content) {
  for (const content of lastMessage.content) {
    if (content.type === 'mcp_tool_use') {
      toolCalls.push(content);
    }
  }
}

return {
  toolCalls,
  userMessage: lastMessage?.content || '',
  conversationId: body.id || 'default'
};
```

### 2. Add Tool Handlers

For each tool you want to expose through MCP, add appropriate nodes:

#### Example: Task Management Tool
```javascript
// If tool call is "get_tasks"
if ($input.first().json.toolCalls.some(tc => tc.name === 'get_tasks')) {
  // Query your task database
  // Return formatted response
}
```

### 3. Format MCP Response

Add a final Function node to format the response:

```javascript
const toolResults = $input.all().map(item => item.json);

// Format as MCP response
const response = {
  id: $node["Webhook"].json.id,
  type: "message",
  role: "assistant",
  content: [
    {
      type: "text",
      text: "I've processed your request using the project management tools."
    },
    ...toolResults.map(result => ({
      type: "mcp_tool_result",
      tool_use_id: result.tool_use_id,
      is_error: false,
      content: [{
        type: "text",
        text: JSON.stringify(result.data)
      }]
    }))
  ],
  model: "n8n-mcp-server",
  stop_reason: "end_turn",
  usage: {
    input_tokens: 0,
    output_tokens: 0
  }
};

return response;
```

## Available Tools

You can implement any tools your project management system needs:

### Suggested Tools

1. **get_tasks** - Retrieve tasks with filters
2. **create_task** - Create a new task
3. **update_task** - Update task status/details
4. **get_projects** - List all projects
5. **create_meeting** - Schedule a meeting
6. **get_team_members** - List team members
7. **assign_task** - Assign task to team member

### Tool Implementation Example

```javascript
// Tool: get_tasks
const toolCall = $input.first().json.toolCalls.find(tc => tc.name === 'get_tasks');
if (toolCall) {
  const { status, assignee, project } = toolCall.input;
  
  // Query your database
  const tasks = await queryTasks({ status, assignee, project });
  
  return {
    tool_use_id: toolCall.id,
    data: {
      tasks: tasks,
      count: tasks.length
    }
  };
}
```

## Testing Your Setup

1. **Get your webhook URL** from the Webhook node
2. **Test with MCP Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```
3. **Configure in the app**:
   - Set `VITE_N8N_SSE_URL` to your webhook URL
   - Set `VITE_N8N_AUTH_TOKEN` if using authentication

## Security Considerations

1. **Always use HTTPS** - MCP requires secure connections
2. **Implement authentication** - Use Bearer tokens
3. **Validate inputs** - Sanitize all tool inputs
4. **Rate limiting** - Implement rate limits on your webhook
5. **Error handling** - Return proper error responses

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Ensure n8n is accessible from the internet
   - Check firewall rules

2. **Authentication errors**
   - Verify Bearer token matches
   - Check token expiration

3. **Tool not found**
   - Ensure tool name matches exactly
   - Check tool is properly registered

### Debug Mode

Enable debug logging in your Function nodes:
```javascript
console.log('Incoming request:', JSON.stringify($input.first().json, null, 2));
```

## Example Full Workflow

A complete example workflow JSON can be imported into n8n:

```json
{
  "name": "MCP Project Management Server",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "mcp-webhook",
        "responseMode": "sse",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    }
    // ... additional nodes
  ]
}
```

## Next Steps

1. Implement your specific project management tools
2. Add error handling and logging
3. Set up monitoring for your webhook
4. Document your available tools for users 
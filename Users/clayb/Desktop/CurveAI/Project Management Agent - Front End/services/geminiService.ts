import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants'; // Ensure correct path

let chat: Chat | null = null;

const initializeChat = (): Chat => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is not set in environment variables.");
    throw new Error("VITE_GEMINI_API_KEY not configured. Set it in your .env file.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
};

const getChat = (): Chat => {
  if (!chat) {
    chat = initializeChat();
  }
  return chat;
};

// Function to extract suggestions (e.g., if AI provides them in a structured way)
// This is a placeholder, actual parsing logic depends on AI's output format for suggestions.
const extractSuggestions = (responseText: string): string[] => {
    const suggestions: string[] = [];
    // Example: AI might list suggestions like:
    // "Here are some things you can ask:\n- Suggestion 1\n- Suggestion 2"
    const suggestionMarker = "You could also ask:"; // Or any other marker
    const suggestionLines = responseText.split('\n');
    let foundMarker = false;
    for (const line of suggestionLines) {
        if (line.includes(suggestionMarker)) {
            foundMarker = true;
            continue;
        }
        if (foundMarker && line.trim().startsWith('- ')) {
            suggestions.push(line.trim().substring(2));
        } else if (foundMarker && line.trim() === "") { // Stop if empty line after marker
            break;
        }
    }
    // A more robust way would be to instruct the AI to format suggestions like:
    // "[SUGGESTION] Create a task"
    // "[SUGGESTION] Set a reminder"
    // Then parse these. For now, this is a simple heuristic.
    return suggestions;
};

export const sendMessageToGemini = async (
  message: string,
  history?: { role: string; parts: Part[] }[]
): Promise<{ text: string; suggestions: string[] }> => {
  try {
    const chatInstance = getChat();
    // Note: The current Gemini SDK for `chat.sendMessage` might not directly support passing full history
    // in the same way as `generateContent` with `contents` array.
    // `chat.sendMessage` inherently maintains history within the `Chat` object.
    // If explicit history control is needed for each call with `sendMessage`,
    // you might need to re-create chat or use `generateContent` with formatted history.
    // For this implementation, we rely on the Chat object's internal history.

    const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
    const responseText = response.text;
    
    // Attempt to parse suggestions from the response text.
    // This is a basic example; you might need a more robust way to get suggestions,
    // potentially by asking the AI to format them in a specific way.
    const suggestions = extractSuggestions(responseText);

    return { text: responseText, suggestions };

  } catch (error: unknown) {
    console.error("Error sending message to Gemini:", error);
    let errorMessage = "Sorry, I encountered an unknown error. 😟";
    if (error instanceof Error) {
      errorMessage = `Sorry, I encountered an error: ${error.message} 😟. Please check your API key and network connection.`;
    }
    // If API key is specifically the issue, Gemini SDK might throw a specific error type or message.
    // You can add more specific checks here if needed.
    return { text: errorMessage, suggestions: [] };
  }
};

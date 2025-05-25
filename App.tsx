import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import LoadingIndicator from './components/LoadingIndicator';
import { Bars3Icon, SparklesIcon } from './constants';
import { chatService } from './services/chatService';
import { validateConfig } from './config/config';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: 'Hello! I am Curve AI, your project management assistant. How can I help you today? 😊',
      sender: 'ai',
      timestamp: Date.now(),
      suggestions: ["What are my urgent tasks?", "Summarize project 'Phoenix'", "Create a new meeting for tomorrow"]
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<{ service: string; configured: boolean }>({ service: 'None', configured: false });
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Validate configuration on mount
    const isValid = validateConfig();
    const status = chatService.getServiceStatus();
    setServiceStatus(status);
    
    if (!isValid || !status.configured) {
      const configMessage: Message = {
        id: 'config-warning',
        text: `⚠️ Configuration needed: ${status.service} is not properly configured. Please check your environment variables.`,
        sender: 'system',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, configMessage]);
    } else {
      const statusMessage: Message = {
        id: 'service-status',
        text: `✅ Connected to ${status.service}`,
        sender: 'system',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, statusMessage]);
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Pass the entire message history to the chat service
      const response = await chatService.sendMessage(text, [...messages, userMessage]);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response.text,
        sender: 'ai',
        timestamp: Date.now(),
        suggestions: response.suggestions,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      
      // If there are tool calls, we might want to display them
      if (response.toolCalls && response.toolCalls.length > 0) {
        console.log('Tool calls executed:', response.toolCalls);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, something went wrong while contacting Curve AI. Please try again. 😟',
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
         <div
           className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
           onClick={() => setIsSidebarOpen(false)}
         />
      )}

      <div className="flex-1 flex flex-col max-h-screen relative">
        {/* Header */}
        <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 p-3 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
                <SparklesIcon className="w-6 h-6 text-indigo-400" />
                <h1 className="text-xl font-semibold text-slate-200">Curve AI Assistant</h1>
                <span className="text-xs text-slate-400">({serviceStatus.service})</span>
            </div>
            <div className="w-10"></div> {/* Spacer */}
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={chatEndRef} />
        </main>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;

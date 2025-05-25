import React from 'react';
import { Message } from '../types';
import { SparklesIcon, UserIcon, InformationCircleIcon } from '../constants';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  // Basic markdown-to-HTML for bold, italic, code blocks, and lists
  const formatText = (text: string): React.ReactNode => {
    // Replace ```lang\ncode``` or ```code``` with <pre><code>
    text = text.replace(/```(\w+)?\s*\n([\s\S]*?)\n\s*```/g, (_match, _lang, code) => {
        return `<pre class="bg-slate-800 p-3 rounded-md my-2 text-sm overflow-x-auto"><code class="font-mono">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    });
     // Replace `inline code` with <code>
    text = text.replace(/`([^`]+)`/g, '<code class="bg-slate-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    // Replace **bold** with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *italic* with <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
     // Replace unordered lists
    text = text.replace(/^\s*-\s+(.*)/gm, '<li class="ml-4 list-disc">$1</li>');
    text = text.replace(/(<li>(.|\n)*?<\/li>)+/g, '<ul>$&</ul>');
    // Replace newlines with <br /> tags, but not inside <pre>
    const parts = text.split(/(<pre[\s\S]*?<\/pre>)/);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is a <pre> block
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br />') }} />;
    });
  };

  // System messages have a different style
  if (isSystem) {
    return (
      <div className="flex justify-center mb-4 fade-in">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-400">
          <InformationCircleIcon className="w-4 h-4" />
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-4 fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-2 max-w-xl ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-500' : 'bg-slate-700'}`}>
          {isUser ? <UserIcon className="w-5 h-5 text-white" /> : <SparklesIcon className="w-5 h-5 text-indigo-400" />}
        </div>
        <div className={`px-4 py-3 rounded-lg shadow ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
          <div className="prose prose-sm prose-invert max-w-none break-words">
            {formatText(message.text)}
          </div>
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-600">
              <p className="text-xs text-slate-400 mb-1">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
                    className="px-3 py-1 text-sm bg-slate-600 hover:bg-indigo-500 rounded-full transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          {message.toolCalls && message.toolCalls.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-600">
              <p className="text-xs text-slate-400 mb-1">Tools used:</p>
              <div className="text-xs text-slate-500">
                {message.toolCalls.map((tool, index) => (
                  <div key={index}>
                    • {tool.name} ({tool.server_name})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

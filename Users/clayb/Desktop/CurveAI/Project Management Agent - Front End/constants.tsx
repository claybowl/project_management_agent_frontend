import React from 'react';
import { IconProps } from './types';

export const SYSTEM_PROMPT = `You are Curve AI Assistant, a friendly and highly capable project management assistant.
Your goal is to provide smooth, conversational interactions.
- Always respond in a casual, supportive, and slightly enthusiastic tone.
- Integrate emojis naturally into your responses to enhance readability and friendliness 😊.
- When asked to perform an action related to a project management tool (like Linear, Notion, GitHub, Google Calendar, etc.), clearly state the action you would perform as if you were fully integrated. For example, if asked to "create a task in Linear", you might respond: "Okay! I'd create a new task in Linear with the details you provided. 👍 What should be the title of this task?"
- If the user's query is ambiguous or needs more details for a tool-related action, ask clarifying questions.
- Proactively suggest relevant follow-up questions or actions. For example, after answering a project status question, you could ask, "Would you like me to set a reminder for any upcoming deadlines for this project? 🗓️" or "Is there anything else I can help you with regarding this project? 🤔". Present these suggestions clearly.
- If a user asks about a topic where internal documentation might be helpful, you can suggest it by saying something like: "I found some internal documentation that might be relevant to your question on [topic]. Would you like me to share the link? 📚" (But don't actually provide a link unless explicitly programmed to do so).
- Keep responses concise but informative. If you need to provide a list, use markdown bullet points.
- Format your responses clearly. For code snippets or structured data, use markdown code blocks.
`;

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const Bars3Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.036-7.026A7.5 7.5 0 004.5 12H3m18 0h-1.5m-15.036 7.026A7.5 7.5 0 014.5 12H3m18 0h-1.5m0 0A7.5 7.5 0 0012 4.5M7.5 4.5A7.5 7.5 0 0012 19.5m-4.5-15A7.5 7.5 0 0112 4.5m0 15A7.5 7.5 0 017.5 19.5m0-15h1.5m13.5 0h-1.5m0 0V3m0 18v-1.5m-15.036-7.026A7.5 7.5 0 004.5 12v1.5m15-.036A7.5 7.5 0 0119.5 12v1.5m0-15V3m0 18v-1.5" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a12.06 12.06 0 00-4.5 0m4.5 0V21m-4.5 0V21m0 0a12.064 12.064 0 01-4.5 0m4.5 0a12.068 12.068 0 004.5 0M9 4.878A3.75 3.75 0 1012 3.75a3.75 3.75 0 00-3 1.128M15 4.878A3.75 3.75 0 1112 3.75a3.75 3.75 0 013 1.128m-6 0A6.751 6.751 0 009 9.75V12m6-2.25A6.751 6.751 0 0115 9.75V12m0 0v3.75m0 0a3.75 3.75 0 01-3 1.128m0-1.128a3.75 3.75 0 01-3-1.128m0 0V12m0-6H9" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091c-.95.16-1.953.255-3 .255h-3c-1.136 0-2.1-.847-2.193-1.98A18.75 18.75 0 012.25 12.747v-4.286c0-.97.616-1.813 1.5-2.097m16.5 0c2.22-2.212 4.218-4.228 4.218-4.228V4.25A2.25 2.25 0 0018.75 2H13.5A2.25 2.25 0 0011.25 4.25v3.261m0 0L10.5 7.5M13.5 7.5l-1.5-1.5m0 0V3.75m0 0A2.25 2.25 0 0013.5 1.5h-3A2.25 2.25 0 008.25 3.75v3.261m0 0L7.5 7.5M10.5 7.5L9 6.25" />
  </svg>
);


export const DocumentTextIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const InformationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

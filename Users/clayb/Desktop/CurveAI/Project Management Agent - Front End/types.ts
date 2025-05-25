export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: number;
  suggestions?: string[];
  toolCalls?: {
    name: string;
    server_name: string;
    input: Record<string, any>;
  }[];
}

export interface IconProps {
  className?: string;
}

export type ChatMessageRole = 'user' | 'program';

export interface ChatMessage {
  id: string;
  text: string;
  role: ChatMessageRole;
}

export interface Program {
  id: string;
  label: string;
  description: string;
}

export type ChatMessageRole = "user" | "program";

export interface ChatMessage {
  id: string;
  text: string;
  role: ChatMessageRole;
  timestamp: string;
}

export interface ChatStoreState {
  hasInteracted: boolean;
  messages: ChatMessage[];
  _createMessage: (text: string, role: ChatMessageRole) => ChatMessage;
  sendUserMessage: (text: string) => void;
  sendProgramMessage: (label: string) => void;
  clearMessages: () => void;
  deleteMessage: (id: string) => void;
}

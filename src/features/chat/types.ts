export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  text: string;
  createdAt: string;
}

export interface ChatProgram {
  id: string;
  label: string;
  description: string;
}

export interface SendMessageInput {
  text: string;
  programId?: string | null;
}

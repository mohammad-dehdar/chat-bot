import { ChatMessageRole } from "@/app/(home)/state/chat-store";

export interface MessageBubbleProps {
    text: string;
    role: ChatMessageRole;
  }
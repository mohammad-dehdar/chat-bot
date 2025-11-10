import { ChatMessageRole } from "@/features/home/store/types";

export interface MessageBubbleProps {
  text: string;
  role: ChatMessageRole;
}
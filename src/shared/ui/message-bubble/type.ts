import type { ChatMessageRole } from '@/features/chat/types';

export interface MessageBubbleProps {
  text: string;
  role: ChatMessageRole;
}

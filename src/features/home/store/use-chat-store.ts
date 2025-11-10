import { create } from 'zustand';
import { ChatMessage, ChatMessageRole, ChatStoreState } from './types';

const createMessage = (text: string, role: ChatMessageRole): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  text,
  role,
  timestamp: new Date().toISOString(),
});

export const useChatStore = create<ChatStoreState>((set, get) => ({
  hasInteracted: false,
  messages: [],
  _createMessage: createMessage,
  sendUserMessage: (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    set((state) => ({
      hasInteracted: true,
      messages: [...state.messages, get()._createMessage(trimmed, 'user')],
    }));
  },
  sendProgramMessage: (label) => {
    set((state) => ({
      hasInteracted: true,
      messages: [
        ...state.messages,
        get()._createMessage(`برنامه انتخاب شده: ${label}`, 'program'),
      ],
    }));
  },
  clearMessages: () => {
    set({
      messages: [],
      hasInteracted: false,
    });
  },
  deleteMessage: (id) => {
    set((state) => {
      const nextMessages = state.messages.filter((message) => message.id !== id);
      return {
        messages: nextMessages,
        hasInteracted: state.hasInteracted && nextMessages.length > 0,
      };
    });
  },
}));

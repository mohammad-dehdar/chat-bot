import { create } from 'zustand';
import { ChatMessage, ChatMessageRole, ChatStoreState } from './types';

const createMessage = (text: string, role: ChatMessageRole): ChatMessage => ({
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    role,
});

export const useChatStore = create<ChatStoreState>((set) => ({
    hasInteracted: false,
    messages: [],
    sendUserMessage: (text) => {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }

        set((state) => ({
            hasInteracted: true,
            messages: [...state.messages, createMessage(trimmed, 'user')],
        }));
    },
    sendProgramMessage: (label) => {
        set((state) => ({
            hasInteracted: true,
            messages: [
                ...state.messages,
                createMessage(`برنامه انتخاب شده: ${label}`, 'program'),
            ],
        }));
    },
}));

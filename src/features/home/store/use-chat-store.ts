import { create } from 'zustand';

export type ChatMessageRole = 'user' | 'program';

export interface ChatMessage {
    id: string;
    text: string;
    role: ChatMessageRole;
}

interface ChatStoreState {
    hasInteracted: boolean;
    messages: ChatMessage[];
    sendUserMessage: (text: string) => void;
    sendProgramMessage: (label: string) => void;
}

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

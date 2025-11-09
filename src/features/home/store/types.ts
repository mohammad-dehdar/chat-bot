export type ChatMessageRole = 'user' | 'program';

export interface ChatMessage {
    id: string;
    text: string;
    role: ChatMessageRole;
}

export interface ChatStoreState {
    hasInteracted: boolean;
    messages: ChatMessage[];
    sendUserMessage: (text: string) => void;
    sendProgramMessage: (label: string) => void;
}
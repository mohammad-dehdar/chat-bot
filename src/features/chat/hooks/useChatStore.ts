import { create } from "@/shared/lib/zustand";
import type { ChatMessage } from "../types";

interface ChatState {
  hasInteracted: boolean;
  messages: ChatMessage[];
  selectedProgramId: string | null;
  selectedProgramLabel: string | null;
}

interface ChatActions {
  selectProgram: (programId: string | null, label: string | null) => void;
  addUserMessage: (text: string) => ChatMessage | null;
  addAssistantMessage: (text: string) => ChatMessage;
  reset: () => void;
}

const createMessage = (role: ChatMessage["role"], text: string): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  text,
  createdAt: new Date().toISOString(),
});

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  hasInteracted: false,
  messages: [],
  selectedProgramId: null,
  selectedProgramLabel: null,

  selectProgram: (programId, label) =>
    set({
      selectedProgramId: programId,
      selectedProgramLabel: label,
      hasInteracted: programId !== null,
    }),

  addUserMessage: (rawText) => {
    const text = rawText.trim();
    if (!text) {
      return null;
    }

    const message = createMessage("user", text);
    set((state) => ({
      hasInteracted: true,
      messages: [...state.messages, message],
    }));
    return message;
  },

  addAssistantMessage: (text) => {
    const message = createMessage("assistant", text);
    set((state) => ({ messages: [...state.messages, message] }));
    return message;
  },

  reset: () =>
    set({
      hasInteracted: false,
      messages: [],
      selectedProgramId: null,
      selectedProgramLabel: null,
    }),
}));

import { create } from "zustand";

interface MessageProps {
  message_type: "USER" | "ASSISTANT" | "date";
  content: string;
  timestamp: Date;
}

interface ChatStateProps {
  messages: MessageProps[];
  setMessages: (messages: MessageProps[] | ((prevMessages: MessageProps[]) => MessageProps[])) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStateProps>((set) => ({
  messages: [],

  setMessages: (messages: MessageProps[] | ((prevMessages: MessageProps[]) => MessageProps[])) => set((state) => ({
    messages: typeof messages === "function" ? messages(state.messages) : messages,
  })),

  clearMessages: () => set({ messages: [] }),
}));

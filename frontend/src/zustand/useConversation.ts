import { create } from "zustand";

import { ConversationType, MessageType } from "../types/global.ts";

// conversation state structure //
type ConversationState = {
  selectedConversation: null | ConversationType;
  messages: MessageType[];
  setSelectedConversation: (conversation: null | ConversationType) => void;
  setMessages: (messages: MessageType[]) => void;
};

// create the zustand store to manage conversation state globally //
const useConversation = create<ConversationState>((set) => ({
  // initially no conversation is selected //
  selectedConversation: null,

  // fxn to set or update the selected conversation //
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  // initially messages are empty until a conversation is selected and messages are loaded //
  messages: [],

  // fxn to set or update the messages array for the selected conversation //
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

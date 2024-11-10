import { MessageCircle } from "lucide-react";

import { useAuthContext } from "../../context/AuthContext.tsx";

import useConversation from "../../zustand/useConversation.ts";

import { Messages } from "./Messages.tsx";
import { MessageInput } from "./MessageInput.tsx";

export const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* header */}
          <div className="px-4 py-2 mb-2 flex items-center gap-1 bg-slate-500">
            <span className="label-text">To:</span>
            <span className="font-bold text-gray-900">
              {selectedConversation.fullname}
            </span>
          </div>

          <Messages />

          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="px-4 flex flex-col items-center gap-2 text-center sm:text-lg md:text-xl text-gray-200 font-semibold">
        <p>Welcome 👋 {authUser?.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-center text-3xl md:text-6xl" />
      </div>
    </div>
  );
};

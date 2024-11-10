import { useAuthContext } from "../../context/AuthContext.tsx";

import useConversation from "../../zustand/useConversation.ts";

import { MessageType } from "../../types/global.ts";

import { extractTime } from "../../utils/extractTime.ts";

export const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();

  const fromMe = authUser?.id === message.sender_id;

  const chatClass = fromMe ? "chat-end" : "chat-start";

  const img = fromMe
    ? authUser?.profile_picture
    : selectedConversation?.profile_picture;

  const bubbleBg = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img src={img} alt="Tailwind CSS chat bubble component" />
        </div>
      </div>

      <p
        className={`chat-bubble text-sm md:text-md text-white ${shakeClass} ${bubbleBg}`}
      >
        {message.message}
      </p>

      <span className="chat-footer flex items-center gap-1 text-xs text-white opacity-50">
        {extractTime(message.created_at)}
      </span>
    </div>
  );
};

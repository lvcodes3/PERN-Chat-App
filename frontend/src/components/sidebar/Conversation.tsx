import { useSocketContext } from "../../context/SocketContext.tsx";

import useConversation from "../../zustand/useConversation.ts";

import { ConversationType } from "../../types/global.ts";

export const Conversation = ({
  conversation,
  emoji,
}: {
  conversation: ConversationType;
  emoji?: string;
}) => {
  const { onlineUsers } = useSocketContext();

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected: boolean =
    selectedConversation?.conversation_id === conversation.conversation_id;

  const isOnline: boolean = onlineUsers.includes(conversation.user_id);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`p-2 py-1 flex items-center gap-2 rounded cursor-pointer ${
          isSelected && "bg-sky-500"
        } hover:bg-sky-500`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-8 md:w-12 rounded-full">
            <img src={conversation.profile_picture} alt="user avatar" />
          </div>
        </div>

        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col gap-0">
            <p className="text-sm md:text-md text-white font-bold">
              {conversation.fullname}
            </p>
            <p className="hidden md:block text-sm text-gray-200 font-semibold">
              @{conversation.username}
            </p>
          </div>

          {emoji && (
            <div className="hidden md:block text-xl">
              <span className="">{emoji}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

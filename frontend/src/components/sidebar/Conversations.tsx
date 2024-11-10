import useGetConversations from "../../hooks/useGetConversations.ts";

import { getRandomEmoji } from "../../utils/emojis.ts";

import { Conversation } from "./Conversation.tsx";

export const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.conversation_id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};

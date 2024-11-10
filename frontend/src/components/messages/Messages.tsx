import useGetMessages from "../../hooks/useGetMessages.ts";
import useListenMessages from "../../hooks/useListenMessages.ts";
import useChatScroll from "../../hooks/useChatScroll.ts";

import { MessageSkeleton } from "../skeletons/MessageSkeleton.tsx";
import { Message } from "./Message.tsx";

export const Messages = () => {
  const { loading, messages } = useGetMessages();

  useListenMessages();

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div ref={ref} className="px-4 flex-1 overflow-auto">
      {/* data loading */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* messages fetched */}
      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {/* empty conversation */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation.
        </p>
      )}
    </div>
  );
};

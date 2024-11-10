import { useState } from "react";
import toast from "react-hot-toast";

import useConversation from "../zustand/useConversation.ts";

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    try {
      if (!selectedConversation) return;

      setLoading(true);

      const response = await fetch(
        `/api/messages/send/${selectedConversation.user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "An error occurred.");

      setMessages([...messages, data]);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useConversation from "../zustand/useConversation.ts";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!selectedConversation) return;

        setLoading(true);

        setMessages([]);

        const response = await fetch(
          `/api/messages/${selectedConversation.user_id}`
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "An error occurred.");

        setMessages(data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessages;

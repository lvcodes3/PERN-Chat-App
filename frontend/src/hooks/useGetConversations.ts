import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ConversationType } from "../types/global.ts";

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/messages/conversations");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext.tsx";

import useConversation from "../zustand/useConversation.ts";

import { MessageType } from "../types/global.ts";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = async (newMessage: MessageType) => {
      newMessage.shouldShake = true;

      // attempt to play notification sound //
      try {
        const sound = new Audio(notificationSound);
        sound.play();
      } catch (err) {
        console.warn("Audio playback was prevented: ", err);
      }

      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

import { useState } from "react";
import { Send } from "lucide-react";

import useSendMessage from "../../hooks/useSendMessage.ts";

export const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="px-4 mb-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          className="w-full p-2.5 block text-sm text-white border rounded-lg border-gray-600 bg-gray-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-0 end-0 pe-3 flex items-center"
        >
          {loading ? (
            <span className="loading loading-spinner mx-auto" />
          ) : (
            <Send className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

import { useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

import useConversation from "../../zustand/useConversation.ts";

import useGetConversations from "../../hooks/useGetConversations.ts";

import { ConversationType } from "../../types/global.ts";

export const SearchInput = () => {
  const [search, setSearch] = useState<string>("");

  const { setSelectedConversation } = useConversation();

  const { conversations } = useGetConversations();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long.");
    }

    const conversation = conversations.find((conversation: ConversationType) =>
      conversation.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="input-sm md:input input-bordered w-full rounded-full sm:rounded-full"
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle text-white bg-sky-500"
      >
        <Search className="w-4 md:w-6 h-4 md:h-6 outline-none" />
      </button>
    </form>
  );
};

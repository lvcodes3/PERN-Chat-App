import { SearchInput } from "./SearchInput.tsx";
import { Conversations } from "./Conversations.tsx";

export const Sidebar = () => {
  return (
    <div className="w-44 md:w-1/2 p-1 md:p-4 flex flex-col border-r border-slate-500">
      <SearchInput />

      <div className="divider px-3" />

      <Conversations />
    </div>
  );
};

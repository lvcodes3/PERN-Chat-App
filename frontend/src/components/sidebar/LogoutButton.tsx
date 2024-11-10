import { LogOut } from "lucide-react";

import useLogout from "../../hooks/useLogout.ts";

export const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="">
      {loading ? (
        <span className="loading loading-spinner mx-auto" />
      ) : (
        <LogOut
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        />
      )}
    </div>
  );
};

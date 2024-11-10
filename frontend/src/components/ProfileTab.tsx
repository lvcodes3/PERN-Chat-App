import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext.tsx";

import { LogoutButton } from "./sidebar/LogoutButton.tsx";

export const ProfileTab = () => {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  return (
    <div className="w-60 h-20 md:w-28 md:h-36 absolute right-1 top-1 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-2 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 hover:bg-sky-500">
      {/* avatar */}
      <div
        onClick={() => navigate("/profile")}
        className="avatar online cursor-pointer"
      >
        <div className="w-8 md:w-12 rounded-full">
          <img src={authUser?.profile_picture} alt="user avatar" />
        </div>
      </div>

      {/* fullname & username */}
      <div className="text-center">
        <p
          onClick={() => navigate("/profile")}
          className="text-md text-white cursor-pointer"
        >
          {authUser?.fullname}
        </p>

        <p
          onClick={() => navigate("/profile")}
          className="text-sm text-white cursor-pointer"
        >
          @{authUser?.username}
        </p>
      </div>

      <LogoutButton />
    </div>
  );
};

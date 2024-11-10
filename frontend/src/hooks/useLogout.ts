import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext.tsx";

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setAuthUser(null);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

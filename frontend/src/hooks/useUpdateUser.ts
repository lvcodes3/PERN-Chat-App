import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext.tsx";

import { ProfileInputsType } from "../types/global.ts";

const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthUser } = useAuthContext();

  const update = async (inputs: ProfileInputsType) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setAuthUser(data);

      toast.success("Profile updated successfully.");
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, update };
};

export default useUpdateUser;

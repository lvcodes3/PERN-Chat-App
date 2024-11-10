import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext.tsx";

import { ChangePasswordInputsType } from "../types/global.ts";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthUser } = useAuthContext();

  const updatePassword = async (inputs: ChangePasswordInputsType) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/updatePassword", {
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

      toast.success("Password updated successfully.");
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updatePassword };
};

export default useUpdatePassword;

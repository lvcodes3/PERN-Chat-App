import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext.tsx";

import { LoginInputsType } from "../types/global.ts";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthUser } = useAuthContext();

  const login = async (inputs: LoginInputsType) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
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
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

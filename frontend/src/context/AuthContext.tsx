import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { AuthUserType } from "../types/global.ts";

// create the context with default values //
const AuthContext = createContext<{
  authUser: null | AuthUserType; // holds null if not authenticated, or holds the authenticated user's data
  setAuthUser: Dispatch<SetStateAction<null | AuthUserType>>; // fxn to update authUser in state
  isLoading: boolean; // indicates if the app is loading authentication status
}>({
  authUser: null, // initial authUser set to null
  setAuthUser: () => {}, // default empty fxn, which will be overridden by a real fxn in the provider
  isLoading: true, // initial loading state set to true
});

// custom hook to consume the AuthContext //
// provides a simpler way to access auth-related data and fxns in components //
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component wraps children components with AuthContext //
// this allows child components to access the auth state and fxns //
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // state to hold the authenitcated user's data //
  const [authUser, setAuthUser] = useState<null | AuthUserType>(null);

  // state to track if the app is still loading authentication data //
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect to fetch the authenticated user data on component mount //
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await fetch("/api/auth");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setAuthUser(data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
      } finally {
        // ensure loading state is set to false, whether request was successful or not //
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

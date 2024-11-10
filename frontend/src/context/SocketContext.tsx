import { createContext, useContext, useRef, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import { useAuthContext } from "./AuthContext.tsx";

interface ISocketContext {
  socket: null | Socket; // null or connected socket instance
  onlineUsers: string[]; // array of online user ids
}

const socketUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5050" : "/";

// create the Socket Context //
const SocketContext = createContext<undefined | ISocketContext>(undefined);

// custom hook to provide a convenient way to access the socket context in any component //
export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider."
    );
  }

  return context;
};

// Provider Component that sets up and manages the Socket.IO connection and online users state //
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, authUser } = useAuthContext();

  const socketRef = useRef<null | Socket>(null); // Use ref to persist the socket instance

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // handle connection and disconnection based on user authentication status //
  useEffect(() => {
    // not loading & user authenticated => initialize the socket connection //
    if (!isLoading && authUser) {
      // create new socket connection, passing in the user's id as a query parameter //
      const socket = io(socketUrl, {
        query: {
          userId: authUser.id,
        },
      });

      // store the socket in the ref for access outside the effect //
      socketRef.current = socket;

      // listen for "getOnlineUsers" events from the server //
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // cleanup fxn to close the socket connection when the component unmounts or user logs out //
      return () => {
        socket.close();
        socketRef.current = null;
      };
    }
    // not loading & user not authenticated => ensure any open socket is closed //
    else if (!isLoading && !authUser) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [isLoading, authUser]); // re-run the effect when authentication status changes

  // return the provider with value including the current socket instance and onlineUsers list //
  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

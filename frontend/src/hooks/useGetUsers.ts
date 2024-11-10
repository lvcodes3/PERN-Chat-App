// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import { UserConversationType } from "../types/global.ts";

// const useGetUsers = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const [users, setUsers] = useState<UserConversationType[]>([]);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch("/api/auth/users");

//         const data = await response.json();

//         if (!response.ok) throw new Error(data.error || "An error occurred.");

//         setUsers(data);
//       } catch (err: any) {
//         console.error(err.message);
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   return { loading, users };
// };

// export default useGetUsers;

// import useGetUsers from "../../hooks/useGetUsers.ts";

// import { Conversation } from "./Conversation.tsx";

// export const Users = () => {
//   const { loading, users } = useGetUsers();

//   console.log(users);

//   return (
//     <div className="w-44 md:w-1/2 p-1 md:p-4 flex flex-col border border-red-500">
//       <div className="flex flex-col overflow-auto">
//         <h1 className="mb-3 text-center text-2xl text-white">Users</h1>

//         <div className="flex flex-col gap-4">
//           {users.map((user) => (
//             <Conversation key={user.user_id} conversation={user} />
//           ))}
//           {loading ? (
//             <span className="loading loading-spinner mx-auto" />
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

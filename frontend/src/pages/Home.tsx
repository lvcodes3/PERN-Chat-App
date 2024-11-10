import { ProfileTab } from "../components/ProfileTab.tsx";
import { Sidebar } from "../components/sidebar/Sidebar.tsx";
import { MessageContainer } from "../components/messages/MessageContainer.tsx";
// import { Users } from "../components/sidebar/Users.tsx";

const Home = () => {
  return (
    <>
      <ProfileTab />

      <div className="w-full md:max-w-screen-md h-[80vh] md:h-[550px] flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />

        <MessageContainer />

        {/* <Users /> */}
      </div>
    </>
  );
};

export default Home;

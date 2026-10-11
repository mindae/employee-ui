import { useContext } from "react";
import UserContext from "./UserContext";
import Profile from "./Profile";

function Dashboard() {
  const user = "jane doe";
  return (
    <UserContext.Provider value={user}>
      <Profile />
    </UserContext.Provider>
  );
}

export default Dashboard;

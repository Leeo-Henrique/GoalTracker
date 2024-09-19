import { Routes } from "../routes";
import { UserProvider } from "./UserContext/usersContext";

export const Contexts = () => {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};

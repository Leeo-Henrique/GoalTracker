import React, { useContext } from "react";
import UserContext from "../../context/UserContext/usersContext";
import { Container } from "./styles";
import { IUserContext } from "../../interfaces/UserInterfaces";

export const LoginPage = ({}) => {
  const { setUser, loginUser }: IUserContext  = useContext(UserContext);
  return (
    <Container>
      <></>
    </Container>
  );
};

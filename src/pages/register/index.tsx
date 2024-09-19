import { useContext } from "react";
import UserContext from "../../context/UserContext/usersContext";
import { Container, FormLogin } from "./styles";
import { IUserContext } from "../../interfaces/UserInterfaces";
import { useNavigate } from "react-router-dom";

export const RegisterPage = ({}) => {
  const navigate = useNavigate();
  const { setUser, loginUser }: IUserContext = useContext(UserContext);
  return (
    <Container>
      <FormLogin>
        <input></input>
        <input></input>
        <button type="submit"></button>
        <p onClick={() => {
            navigate("/login");
          }}>
          Já é registrado?
        </p>
      </FormLogin>
    </Container>
  );
};

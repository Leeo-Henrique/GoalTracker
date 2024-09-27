import { useContext } from "react";
import UserContext from "../../context/UserContext/usersContext";
import { Container, FormLogin } from "./styles";
import { IUserContext } from "../../interfaces/UserInterfaces";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export const LoginPage = ({}) => {
  const navigate = useNavigate();
  const { setUser, loginUser }: IUserContext = useContext(UserContext);

  return (
    <Container>
      <FormLogin>
        <div>
          <label>Email</label>
          <input></input>
        </div>
        <div>
          <label>Senha</label>
          <input></input>
        </div>
        <div>
          <FcGoogle />
        </div>
        <button type="submit">Entrar</button>
        <p
          onClick={() => {
            navigate("/register");
          }}
        >
          Não e registrado?
        </p>
      </FormLogin>
    </Container>
  );
};

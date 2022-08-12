import {FC} from "react";
import AuthForm from "../components/authorization-form";
import Container from "../components/container";
import Header from "../components/header";
import {ISetUser} from "../utils/types";

const AuthPage: FC<ISetUser> = ({setUser}) => {
  return (
    <>
      <Header />
      <Container>
        <AuthForm setUser={setUser} />
      </Container>
    </>
  );
};

export default AuthPage;

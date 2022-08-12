import {FC, useState} from "react";
import AuthForm from "../components/authorization-form";
import Container from "../components/container";
import ErrorField from "../components/error-field";
import Header from "../components/header";
import {ISetUser} from "../utils/types";

const AuthPage: FC<ISetUser> = ({setUser}) => {
  const [error, setError] = useState("");

  return (
    <>
      <Header />
      <Container>
        <ErrorField>{error}</ErrorField>
        <AuthForm setUser={setUser} setError={setError} />
      </Container>
    </>
  );
};

export default AuthPage;

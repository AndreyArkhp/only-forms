import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import fakeFetch from "../fake-api";
import {IResponse, ISetUser} from "../utils/types";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  position: relative;
  margin-block-end: 74px;
`;

const FormLabel = styled.label`
  position: absolute;
  top: -25px;
  left: 0;
`;

const AuthForm: FC<ISetUser> = ({setUser}) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onChange"});

  const onSubmit = handleSubmit((data) => {
    setBtnDisabled(true);
    fakeFetch(data)
      .then((res: IResponse) => {
        if (res.error?.login) {
          setError(res.error.login);
        }
        if (res.error?.password) {
          setError(res.error.password);
        }
        if (!res.error) {
          setUser({login: res.login});
          navigate("/profile", {replace: true});
        }
      })
      .catch((error: Error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        setBtnDisabled(false);
      });
  });

  return (
    <FormStyled onSubmit={onSubmit} onChange={() => setError("")}>
      <p>{error}</p>
      <FormGroup>
        <FormLabel>Логин</FormLabel>
        <input type="text" {...register("login", {required: true})} />
      </FormGroup>
      {errors.login && <p>Обязательное поле</p>}
      <FormGroup>
        <FormLabel>Пароль </FormLabel>
        <input type="password" {...register("password", {required: true})} />
      </FormGroup>
      {errors.password && <p>Обязательное поле</p>}
      <div>
        <label>
          Запомнить пароль
          <input type="checkbox" {...register("remember")} />
        </label>
      </div>

      <button disabled={btnDisabled}>Войти</button>
    </FormStyled>
  );
};

export default AuthForm;

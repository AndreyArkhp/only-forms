import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import fakeFetch from "../fake-api";
import {IAuthFormProps, IResponse} from "../utils/types";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  height: 17.6041vw;
  justify-content: space-between;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormCheckboxGroup = styled.div`
  display: flex;
  align-items: center;
`;

const FormLabel = styled.label<{for?: string}>`
  display: block;
  font: normal 400 16px/19px "HN", Arial, sans-serif;
  margin-block-end: 0.9259vh;
`;

const FormLabelForCheck = styled.label<{for?: string}>`
  font: normal 400 16px/19px "HN", Arial, sans-serif;
  margin-block-start: 3.85%;
  margin-block-end: 3.125%;
`;

const FormInput = styled.input`
  width: calc(33.3334vw - 3.125%);
  aspect-ratio: 32/3;
  border-radius: 8px;
  background: #f5f5f5;
  border: none;
  padding: 0;
  padding-inline-start: 20px;
  font: normal 400 16px/19px Arial, sans-serif;
  color: #232323;
`;

const FormInputCheckbox = styled.input`
  width: 3.125%;
  aspect-ratio: 1;
  margin-inline-end: 2.1875%;
`;

const FormBtn = styled.button`
  padding: 0;
  width: 33.3334vw;
  aspect-ratio: 32/3;
  border-radius: 8px;
  background: #4a67ff;
  border: none;
  color: #fff;
  font: normal 700 18px/22px "HN", Arial, sans-serif;
  cursor: pointer;
  &:disabled {
    background: #99a9ff;
    cursor: default;
  }
`;

const AuthForm: FC<IAuthFormProps> = ({setUser, setError}) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onChange"});

  const onSubmit = handleSubmit((data) => {
    setBtnDisabled(true);
    setError("");
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
    <FormStyled onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel for="text">Логин</FormLabel>
        <FormInput id="text" type="text" {...register("login", {required: true})} />
      </FormGroup>
      {errors.login && <p>Обязательное поле</p>}
      <FormGroup>
        <FormLabel for="password">Пароль </FormLabel>
        <FormInput id="password" type="password" {...register("password", {required: true})} />

        {errors.password && <p>Обязательное поле</p>}
        <FormCheckboxGroup>
          <FormInputCheckbox id="checkbox" type="checkbox" {...register("remember")} />
          <FormLabelForCheck for="checkbox">Запомнить пароль</FormLabelForCheck>
        </FormCheckboxGroup>
      </FormGroup>

      <FormBtn disabled={btnDisabled}>Войти</FormBtn>
    </FormStyled>
  );
};

export default AuthForm;

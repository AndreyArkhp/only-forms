import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import fakeFetch from "../fake-api";
import {IResponse, ISetUser} from "../utils/types";
import ErrorField from "./error-field";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FormGroup = styled.div`
  position: relative;
  margin-block-end: 3.125%;
`;

const FormCheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FormLabel = styled.label<{for?: string}>`
  display: block;
  font: normal 400 16px/19px "HN", Arial, sans-serif;
  margin-block-end: 0.9259vh;
`;

const FormLabelForCheck = styled.label`
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

const CheckboxRect = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #4a67ff;
  border-radius: 2px;
  opacity: 0;
`;

const FormCustomCheckbox = styled.div`
  width: 3.125%;
  aspect-ratio: 1;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0.15625vw;
  position: absolute;
  content: "";
  bottom: 20px;
  left: 0;
  box-sizing: border-box;
  z-index: -1;
`;

const FormInputCheckboxHidden = styled.input`
  opacity: 0;
  margin-inline-end: 2.1875%;
  width: 3.2%;
  aspect-ratio: 1;
  &:checked ~ ${FormCustomCheckbox} > ${CheckboxRect} {
    opacity: 1;
  }
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

const FormErrorString = styled.p`
  margin: 1.875% 0 0 0;
  color: #e26f6f;
  font: normal 400 14px/17px "HN", Helvetica, sans-serif;
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
      <ErrorField>{error}</ErrorField>
      <FormGroup>
        <FormLabel htmlFor="text">Логин</FormLabel>
        <FormInput id="text" type="text" {...register("login", {required: true})} />
        {errors.login && <FormErrorString>Обязательное поле</FormErrorString>}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="password">Пароль </FormLabel>
        <FormInput id="password" type="password" {...register("password", {required: true})} />

        {errors.password && <FormErrorString>Обязательное поле</FormErrorString>}
        <FormCheckboxGroup>
          <FormInputCheckboxHidden id="checkbox" type="checkbox" {...register("remember")} />
          <FormCustomCheckbox>
            <CheckboxRect />
          </FormCustomCheckbox>
          <FormLabelForCheck htmlFor="checkbox">Запомнить пароль</FormLabelForCheck>
        </FormCheckboxGroup>
      </FormGroup>

      <FormBtn disabled={btnDisabled}>Войти</FormBtn>
    </FormStyled>
  );
};

export default AuthForm;

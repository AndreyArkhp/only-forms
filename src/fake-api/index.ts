import {FieldValues} from "react-hook-form";
import {user} from "../utils/constants";
import {IResponse} from "../utils/types";

const response: IResponse = {
  success: false,
  login: "",
};

const fakeFetch = (data: FieldValues): Promise<IResponse> => {
  const login = data.login.replace(/\s+/g, "");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login !== user.email) {
        response.error = {
          login: `Пользователя ${login} не существует`,
        };
        resolve(response);
      } else if (data.password !== user.password) {
        response.error = {password: "Неверный пароль"};
        resolve(response);
      } else {
        delete response.error;
        response.login = login;
        resolve(response);
      }
    }, Math.random() * 2000);
  });
};

export default fakeFetch;

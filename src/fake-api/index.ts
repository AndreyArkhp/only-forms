import {FieldValues} from "react-hook-form";
import {user} from "../utils/constants";
import {IResponse} from "../utils/types";

const response: IResponse = {
  success: false,
  login: "",
};

const fakeFetch = (data: FieldValues): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.login !== user.email) {
        response.error = {
          login: `Пользователя ${data.login} не существует`,
        };
        resolve(response);
      } else if (data.password !== user.password) {
        response.error = {password: "Неверный пароль"};
        resolve(response);
      } else {
        delete response.error;
        response.login = data.login;
        resolve(response);
      }
    }, 2000);
  });
};

export default fakeFetch;

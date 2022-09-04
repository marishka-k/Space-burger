import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword, setResetFormValue } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { Form } from "../../components/form/form";

import styles from "./reset-password.module.css";
import { FormLink } from "../../components/form/form-link/form-link";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie("token");
  const { password, code } = useSelector((state) => state.auth.data);
  const { resetPasswordSuccess, forgotPasswordSuccess } = useSelector((state) => state.auth);

  const isDisabled = Boolean(!password || !code);

  const onChange = (e) => {
    dispatch(setResetFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token: code }));
  };

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  if (!forgotPasswordSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  if (resetPasswordSuccess) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }

  return (
    <div className={styles.container}>
      <Form formName="Восстановление пароля" buttonText="Сохранить" onSubmit={onFormSubmit} disabled={isDisabled} >
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={onChange}
          value={password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
        />
      </Form>
      <FormLink formName="Вспомнили пароль?" linkName = "Войти" link = "/login" />
    </div>
  );
};

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/auth";
import { Form } from "../../components/form/form";
import { getCookie } from "../../utils/cookie";

import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie("token");

  const { forgotPasswordSuccess } = useSelector((state) => state.auth);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const isDisabled = Boolean(!email);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  if (forgotPasswordSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={styles.fogot_content}>
      <Form formName="Восстановление пароля" buttonText="Восстановить" onSubmit={onFormSubmit} disabled={isDisabled}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
        />
      </Form>
      <p className={`text text_type_main-default text_color_inactive ${styles.navigation}`}>
        Вспомнили пароль?
        <Link className={`pl-2 ${styles.link}`} to="/login"> Войти </Link>
      </p>
    </div>
  );
};

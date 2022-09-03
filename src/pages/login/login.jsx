import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { singIn, setLoginFormValue } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import styles from "./login.module.css";
import { Form } from "../../components/form/form";

export const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie("token");
  const { email, password } = useSelector((state) => state.auth.data);

  const isDisabled = Boolean(!email || !password);

  const onChange = (e) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(singIn(email, password));
  };

  if (cookie) {
    return <Redirect to={location.state?.data || "/"} />;
  }

  return (
    <div className={styles.login_content}>
      <Form
        formName="Вход"
        buttonText="Войти"
        onSubmit={onFormSubmit}
        disabled={isDisabled}
      >
        <EmailInput
          placeholder={"E-mail"}
          value={email}
          name="email"
          onChange={onChange}
        />
        <PasswordInput value={password} name="password" onChange={onChange} />
      </Form>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.navigation} pb-4 `}
      >
        Вы — новый пользователь?
        <Link className={`pl-2 ${styles.link}`} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.navigation}`}
      >
        Забыли пароль?
        <Link className={`pl-2 ${styles.link}`} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

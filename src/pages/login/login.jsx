import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import { PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { singIn, setLoginFormValue } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";

import styles from "./login.module.css";


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
      <Form formName="Вход" buttonText="Войти" onSubmit={onFormSubmit} disabled={isDisabled}>
        <EmailInput placeholder={"E-mail"} value={email} name="email" onChange={onChange}/>
        <PasswordInput value={password} name="password" onChange={onChange} />
      </Form>
      <FormLink formName="Вы — новый пользователь?" linkName = "Зарегистрироваться" link = "/register" />
      <FormLink formName="Забыли пароль?" linkName = "Восстановить пароль" link = "/forgot-password" />      
    </div>
  );
};

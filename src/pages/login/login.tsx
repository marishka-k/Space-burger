
import { PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent } from "react";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";
import { useForm } from "../../hooks/use-form";
import { singIn } from "../../services/actions/auth";
import { useDispatch } from "../../services/types";

import styles from "./login.module.css";


export const Login:FC = () => {
  const dispatch = useDispatch();
  const {values, handleChange } = useForm({email: "", password: ""});
  const isDisabled = Boolean(values.email === "" || values.password === "");

  const onFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    dispatch(singIn(values.email, values.password));
  };

  return (
    <div className={styles.login_content}>
      <Form formName="Вход" buttonText="Войти" onSubmit={onFormSubmit} disabled={isDisabled} >
        <EmailInput value={values.email} name="email" onChange={handleChange} />
        <PasswordInput value={values.password} name="password" onChange={handleChange} />
      </Form>
      <FormLink formName="Вы — новый пользователь?" linkName="Зарегистрироваться" link="/register" />
      <FormLink formName="Забыли пароль?" linkName="Восстановить пароль" link="/forgot-password" />
    </div>
  );
};

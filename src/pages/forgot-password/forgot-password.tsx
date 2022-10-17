import { Redirect } from "react-router-dom";
import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "../../services/types";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";
import { useForm } from "../../hooks/use-form";
import { forgotPassword } from "../../services/actions/auth";

import styles from "./forgot-password.module.css";

export const ForgotPassword:FC = () => {
  const {values, handleChange } = useForm({email: ""});
  const dispatch = useDispatch();
  
  const { forgotPasswordSuccess } = useSelector((state) => state.auth);

  const isDisabled = Boolean(values.email === "");

  const onFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    dispatch(forgotPassword({email: values.email}));
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

  return (
    <div className={styles.fogot_content}>
      <Form formName="Восстановление пароля" buttonText="Восстановить" onSubmit={onFormSubmit} disabled={isDisabled}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={handleChange}
          value={values.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
        />
      </Form>
      <FormLink formName="Вспомнили пароль?" linkName = "Войти" link = "/login" />
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { Redirect, } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/auth";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";

import styles from "./forgot-password.module.css";
import { useForm } from "../../hooks/use-form";


export const ForgotPassword = () => {
  const {values, handleChange } = useForm({email: ""});
  const dispatch = useDispatch();
  
  const { forgotPasswordSuccess } = useSelector((state) => state.auth);

  const isDisabled = Boolean(values.email === "");

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({email: values.email}));
  };

  console.log();

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

import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";
import { useForm } from "../../hooks/use-form";
import { resetPassword } from "../../services/actions/auth";

import styles from "./reset-password.module.css";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {values, handleChange } = useForm({password: "", code: ""});
  const { resetPasswordSuccess, forgotPasswordSuccess } = useSelector((state) => state.auth);

  const isDisabled = Boolean(values.password === "" || values.code === "" );

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password: values.password, token: values.code }));;
  };

  if (!forgotPasswordSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  if (resetPasswordSuccess) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }

  return (
    <div className={styles.reset_content}>
      <Form formName="Восстановление пароля" buttonText="Сохранить" onSubmit={onFormSubmit} disabled={isDisabled} >
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={handleChange}
          value={values.password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
        />
      </Form>
      <FormLink formName="Вспомнили пароль?" linkName = "Войти" link = "/login" />
    </div>
  );
};

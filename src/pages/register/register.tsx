import { FC, FormEvent } from "react";
import { useDispatch } from "../../services/types";

import { Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";
import { useForm } from "../../hooks/use-form";
import { registerUser } from "../../services/actions/auth";


import styles from "./register.module.css";


export const Register: FC = () => {
  const dispatch = useDispatch();
  const {values, handleChange } = useForm({name: "", email: "", password: ""});

  const onFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    dispatch(registerUser(values.name, values.email, values.password));
  };

  return (
    <div className={styles.register_content}>
      <Form formName="Регистрация" buttonText="Зарегистрироваться" onSubmit={onFormSubmit}>
        <Input type={"text"} placeholder={"Имя"} value={values.name} name={"name"} onChange={ handleChange}/>
        <Input type={"text"} placeholder={"E-mail"} value={values.email} name="email" onChange={ handleChange}/>
        <PasswordInput value={values.password} name={"password"} onChange={ handleChange} />
      </Form>
      <FormLink formName="Уже зарегистрированы?" linkName = "Войти" link = "/login" />      
    </div>
  );
};

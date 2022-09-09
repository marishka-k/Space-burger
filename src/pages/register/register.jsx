import { Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Form } from "../../components/form/form";
import { FormLink } from "../../components/form/form-link/form-link";
import { registerUser, setRegisterFormValue } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import styles from "./register.module.css";

export const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie("token");
  const { email, password, name } = useSelector((state) => state.auth.data);

  const onChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={styles.register_content}>
      <Form formName="Регистрация" buttonText="Зарегистрироваться" onSubmit={onFormSubmit}>
        <Input type={"text"} placeholder={"Имя"} value={name} name={"name"} onChange={onChange}/>
        <Input type={"text"} placeholder={"E-mail"} value={email} name="email" onChange={onChange}/>
        <PasswordInput value={password} name={"password"} onChange={onChange} />
      </Form>
      <FormLink formName="Уже зарегистрированы?" linkName = "Войти" link = "/login" />      
    </div>
  );
};

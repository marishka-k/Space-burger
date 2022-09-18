import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch, useLocation } from "react-router-dom";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Orders } from "./orders/orders";
import { getCookie } from '../../utils/cookie';
import { useForm } from "../../hooks/use-form";
import { ordersConnectionClosed, ordersConnectionInit } from '../../services/actions/orders';
import { singOut, changeUser } from "../../services/actions/auth";

import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { name, email } = useSelector((state) => state.auth.user);
  const { values, handleChange, setValues } = useForm({
    name: name,
    email: email,
    password: "",
  });

  useEffect(() => {
		dispatch(ordersConnectionInit(`?token=${getCookie("token")}`));
		return () => {
			dispatch(ordersConnectionClosed())
		}
	}, [dispatch]);

  const isDisabled = Boolean(
    values.name === name && values.email === email && values.password === ""
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUser(values.name, values.email));
  };

  function handleSingOut() {
    dispatch(singOut());
  }

  const onResetForm = (e) => {
    e.preventDefault();
    setValues({
      name: name,
      email: email,
      password: "",
    });
  };

  return (
    <div className={styles.form_container}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={styles.list_element}>
            <NavLink
              to="/profile"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.list_element}>
            <NavLink
              to="/profile/orders"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.list_element}>
            <NavLink
              to="/login"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
              onClick={handleSingOut}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={"text text_type_main-small text_color_inactive mt-20"}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Switch location={background || location}>
        <Route path="/profile/orders" exact>
          <Orders />
        </Route>
        <Route path="/profile" exact>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={`pb-6 ${styles.input}`}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={handleChange}
                icon={"EditIcon"}
                value={values.name}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className={`pb-6 ${styles.input}`}>
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={handleChange}
                icon={"EditIcon"}
                value={values.email}
                name={"email"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className={`pb-6 ${styles.input}`}>
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={handleChange}
                icon={"EditIcon"}
                value={values.password}
                name={"password"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div>
              <Button
                type="secondary"
                size="medium"
                onClick={onResetForm}
                disabled={isDisabled}
              >
                Oтмена
              </Button>
              <Button type="primary" size="medium" disabled={isDisabled}>
                Сохранить
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
};

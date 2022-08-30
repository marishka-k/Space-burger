import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";

import { Button,Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { singOut, changeUser } from "../../services/actions/auth";
import { Orders } from "./orders/orders";

import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => state.auth.user);

  const [data, setData] = useState({
    email: email,
    name: name,
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUser(data.email, data.name, data.password));
  };

  function handleSingOut() {
    dispatch(singOut());
  }

  const onResetForm = (e) => {
    e.preventDefault();
    setData({
      email: email,
      name: name,
      password: "",
    });
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/profile"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              exact
              className={`text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              exact
              className={`text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.link_active} text text_type_main-medium`}
              onClick={handleSingOut}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={"text text_type_main-default text_color_inactive"}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route exact path="/profile/orders">
          <Orders />
        </Route>
        <Route exact path="/profile">
          <form onSubmit={onSubmit}>
            <div className="pb-6">
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChange}
                icon={"EditIcon"}
                value={data.name}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={onChange}
                icon={"EditIcon"}
                value={data.email}
                name={"email"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={onChange}
                icon={"EditIcon"}
                value={data.password}
                name={"password"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <Button type="secondary" size="medium" onClick={onResetForm}>
              Oтмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </form>
        </Route>
      </Switch>
    </div>
  );
};

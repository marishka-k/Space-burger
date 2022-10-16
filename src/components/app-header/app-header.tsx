import { FC, ReactNode } from 'react';
import { Link, NavLink, useRouteMatch } from "react-router-dom";


import { ProfileIcon, ListIcon, BurgerIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import { useSelector } from "../../services/types";

type TNavigationItem = {
  text: string;
  link: string;
  children: ReactNode;
};

const NavigationItem: FC<TNavigationItem> = ({ text, link, children }) => {
  return (
    <NavLink
      to={link}
      exact
      className={`pl-5 pr-5 pb-4 pt-4 text_color_inactive ${styles.link}`}
      activeClassName={`text text_type_main-default ${styles.link_active}`}
    >
      <span className={`mr-2 ${styles.icon}`}>{children}</span>
      <p className={`text text_type_main-default`}>{text}</p>
    </NavLink>
  );
};

const AppHeader: FC = () => {
  const isConstructorActive = !!useRouteMatch({ path: "/", exact: true });
  const isListActive = !!useRouteMatch("/feed");
  const isProfileActive = !!useRouteMatch("/profile");
  const { name } = useSelector((state) => state.auth.user);
  let profileName = name ? name : "Личный кабинет";

  return (
    <header className={`mr-10 ml-10 mt-10 ${styles.header}`}>
      <ul className={`${styles.list} pt-4 pb-4`}>
        <li className={styles.group}>
          <div className={styles.group_links}>
            <NavigationItem link="/" text="Конструктор">
              <BurgerIcon
                type={isConstructorActive ? "primary" : "secondary"}
              />
            </NavigationItem>
            <NavigationItem link="/feed" text="Лента заказов">
              <ListIcon type={isListActive ? "primary" : "secondary"} />
            </NavigationItem>
          </div>
        </li>
        <li className={styles.logo_block}>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className={styles.profile}>
          <NavigationItem link="/profile" text={profileName}>
            <ProfileIcon type={isProfileActive ? "primary" : "secondary"} />
          </NavigationItem>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;

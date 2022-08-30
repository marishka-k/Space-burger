import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";

import { ProfileIcon, ListIcon, BurgerIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const NavigationItem = ({ text, link, children }) => {
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

NavigationItem.propTypes = {
  text: PropTypes.string.isRequired,
  linkAdres: PropTypes.string,
  children: PropTypes.object.isRequired,
};

const AppHeader = () => {
const isConstructorActive = !!useRouteMatch({path: "/", exact: true})
const isListActive = !!useRouteMatch('/feed');
const isProfileActive = !!useRouteMatch('/profile');
  

  return (
    <header className={`mr-10 ml-10 mt-10 ${styles.header}`}>
      <ul className={`${styles.list} pt-4 pb-4`}>
        <li className={styles.group}>
          <div className={styles.group_links}>
            <NavigationItem link="/" text="Конструктор">
              <BurgerIcon type={isConstructorActive ? "primary" : "secondary"}/>
            </NavigationItem>
            <NavigationItem link="/feed" text="Лента заказов">
              <ListIcon type={isListActive ? "primary" : "secondary"}/>
            </NavigationItem>
          </div>
        </li>
        <li className={styles.logo_block}>
          <Logo />
        </li>
        <li className={styles.profile}>
          <NavigationItem link="/profile" text="Личный кабинет">
            <ProfileIcon type={isProfileActive ? "primary" : "secondary" }/>
          </NavigationItem>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;

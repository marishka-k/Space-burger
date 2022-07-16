import React from 'react';
import PropTypes from 'prop-types'

import { ProfileIcon, ListIcon, BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css'

const NavigationItem = ({text, textClass, children}) => {
    return (
        <a href='/' target='_blank' className={`pl-5 pr-5 pb-4 pt-4 ${styles.link}`}>
            <span className={`mr-2 ${styles.icon}`}>
                {children}
            </span>
            <p className={`text text_type_main-default ${textClass}`}>
                {text}
            </p>
        </a>
    )
}

NavigationItem.propTypes = {
    text: PropTypes.string.isRequired,
    textClass: PropTypes.string,
    children: PropTypes.object.isRequired
}

const AppHeader = () => {
    return (
        <header className={`mr-10 ml-10 mt-10 ${styles.header}`}>
            <ul className={styles.list}>
                <li className={styles.group}>
                    <div className={styles.group_links}>
                        <NavigationItem text="Конструктор">
                            <BurgerIcon type="primary"/>
                        </NavigationItem>
                        <NavigationItem text="Лента заказов" textClass="text_color_inactive">
                            <ListIcon type="secondary"/>
                        </NavigationItem>
                    </div>
                </li>
                <li className={styles.logo_block} >
                    <Logo/>  
                </li>
                <li className={styles.profile}>
                    <NavigationItem text="Личный кабинет" textClass="text_color_inactive">
                        <ProfileIcon type="secondary"/>
                    </NavigationItem>
                </li>            
            </ul>
        </header>
    )
}

export default AppHeader
import React from 'react';
import PropTypes from 'prop-types'
import AppHeaderStyles from './app-header.module.css'
import { ProfileIcon, ListIcon, BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';


const NavigationItem = ({text, children}) => {
    return (
        <a href='#' target='_blank' className={`pl-5 pr-5 pb-4 pt-4 ${AppHeaderStyles.link}`}>
            <span className={`mr-2 ${AppHeaderStyles.icon}`}>
                {children}
            </span>
            <p className="text text_type_main-default text_color_inactive">
                {text}
            </p>
        </a>
    )
}

NavigationItem.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
}

const AppHeader = () => {
    return (
        <ul className={`mr-10 ml-10 mt-10 ${AppHeaderStyles.header}`}>
            <li className={AppHeaderStyles.group}>
                <div className={AppHeaderStyles.group_links}>
                    <NavigationItem text="Конструктор">
                        <BurgerIcon type="primary"/>
                    </NavigationItem>
                    <NavigationItem text="Лента заказов">
                        <ListIcon type="secondary"/>
                    </NavigationItem>
                </div>
            </li>
            <li className={AppHeaderStyles.logo_block} >
                <Logo/>  
            </li>
            <li className={AppHeaderStyles.profile}>
                <NavigationItem text="Личный кабинет">
                    <ProfileIcon type="secondary"/>
                </NavigationItem>
            </li>
            
        </ul>
    )
}

export default AppHeader
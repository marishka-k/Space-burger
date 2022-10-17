import { FC } from "react";
import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

export const NotFound404:FC = () => {

	return (
		<div className={`${styles.container} pt-30 pb-30`}>
			<p className="text text_type_digits-large text_color_inactive pb-3">404</p>
			<p className="text text_type_main-large text_color_inactive pb-15">cтраница не найдена</p>
			<Link to='/' className={`${styles.link} text text_type_main-default`}>Вернуться на главную страницу</Link>
		</div >
	)
}
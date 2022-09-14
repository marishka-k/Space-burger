import { Link } from 'react-router-dom';
import styles from './feed.module.css';

export const Feed = () => {

	return (
		<div className={`${styles.container} pt-30 pb-30`}>
			<p className="text text_type_main-large text_color_inactive pb-15">Данная страница находится на стадии разработки</p>
			<Link to='/' className={`${styles.link} text text_type_main-default`}>Вернуться на главную страницу</Link>
		</div >
	)
}


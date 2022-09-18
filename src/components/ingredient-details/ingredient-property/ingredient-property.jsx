import PropTypes from 'prop-types';
import styles from "./ingredient-property.module.css"

const IngredientProperty = ({name, value }) => {
    return (
        <li className={styles.property}>
            <p className="text text_type_main-default text_color_inactive mb-2">{name}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </li>
    )
}

IngredientProperty.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };

export default IngredientProperty
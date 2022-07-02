import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPropTypes from "../../utils/utils";
import styles from "./burger-ingredient.module.css";


const BurgerIngredient = ({ ingredient, onClick }) => {
  const handleClick = () => {
    onClick (ingredient)
  }
  
  return (
    <li className={styles.card} onClick={handleClick}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <div className={`mt-1 mb-2 ${styles.prise_info}`}>
        <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>
        {ingredient.name}
      </p>      
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
};

export default BurgerIngredient;

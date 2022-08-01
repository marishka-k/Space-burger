import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPropTypes from "../../utils/types";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient, count, onClick }) => {
  const handleClick = () => {
    onClick(ingredient);
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients" ,
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <li className={styles.card} onClick={handleClick} ref={dragRef} style={{ opacity }}>
      {count && <Counter count={count} />}
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
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;

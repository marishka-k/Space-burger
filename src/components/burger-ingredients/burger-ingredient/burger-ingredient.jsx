import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPropTypes from "../../../utils/types";

import styles from "./burger-ingredient.module.css";

export const BurgerIngredient = ({ ingredient, count }) => {
  const location = useLocation();  

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <Link
      to={{pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}
      className={`${styles.link}`}
    >
      <div className={styles.card} ref={dragRef} style={{ opacity }} >
        {count && <Counter count={count} />}
        <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4"/>
        <div className={`mt-1 mb-2 ${styles.prise_info}`}>
          <p className="mr-2 text text_type_digits-default"> {ingredient.price} </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}> {ingredient.name} </p>
      </div>
    </Link>
  );
};

BurgerIngredient.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
};
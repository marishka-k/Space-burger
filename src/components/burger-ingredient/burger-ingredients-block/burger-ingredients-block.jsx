import { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import BurgerIngredient from "../burger-ingredient";
import styles from "./burger-ingredients-block.module.css";
import IngredientPropTypes from "../../../utils/types";

const BurgerIngredientsBlock = forwardRef(({ title, titleId, ingredients }, ref ) => {
  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  const counterOfIngredient = useMemo(() => {
    const { bun, fillings } = burgerConstructor;
    const counters = {};

    fillings.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <div>
      <h2 className="text text_type_main-medium mb-6" id={titleId}>
        {title}
      </h2>
      <ul className={`mt-6 ml-4 ${styles.items}`} ref={ref}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient
              ingredient={ingredient}
              key={ingredient._id}
              count={counterOfIngredient[ingredient._id]}
            />
          );
        })}
      </ul>
    </div>
  );
}
)

BurgerIngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};

export default BurgerIngredientsBlock;

import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Styles from "./burger-ingredients-block.module.css";

const BurgerIngredientsBlock = ({ title, titleId, ingredients }) => {
  return (
    <div>
      <h2 className="text text_type_main-medium mb-6" id={titleId}>
        {title}
      </h2>
      <ul className={`mt-6 ml-4 ${Styles.items}`}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerIngredientsBlock;
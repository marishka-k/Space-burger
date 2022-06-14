import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientStyle from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient }) => {
  return (
    <li className={BurgerIngredientStyle.card} key={ingredient._id}>
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <div className={`mt-1 mb-1 ${BurgerIngredientStyle.prise_info}`}>
        <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`text text_type_main-default ${BurgerIngredientStyle.name}`}>{ingredient.name}</h2>
    </li>
  );
};

export default BurgerIngredient;
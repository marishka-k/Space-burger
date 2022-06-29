import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = ({ ingredient, onClick }) => {
  const handleClick = () => {
    onClick (ingredient)
  }
  
  return (
    <li className={style.card} onClick={handleClick}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <div className={`mt-1 mb-2 ${style.prise_info}`}>
        <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${style.name}`}>
        {ingredient.name}
      </p>      
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default BurgerIngredient;

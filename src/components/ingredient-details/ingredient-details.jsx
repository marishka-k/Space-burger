import React from "react";
import style from "./ingredient-details.module.css"
import PropTypes from 'prop-types';

const IngredientDetails = (showIngredient) => {
   
  return (
    <>
      <img src={showIngredient.image} alt={showIngredient.name} className="mb-4" />
      <p className="text text_type_main-default mb-8">{showIngredient.name}</p>
      <ul className={style.properties}>
        <li className={style.property}>
            <p>Калории,ккал</p>
            <p>{showIngredient.calories}</p>
        </li>
        <li className={style.property}>
            <p>Белки, г</p>
            <p>{showIngredient.proteins}</p>
        </li>
        <li className={style.property}>
            <p>Жиры, г</p>
            <p>{showIngredient.fat}</p>
        </li>
        <li className={style.property}>
            <p>Углеводы, г</p>
            <p>{showIngredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
    showIngredient: PropTypes.object.isRequired,
  };

export default IngredientDetails;

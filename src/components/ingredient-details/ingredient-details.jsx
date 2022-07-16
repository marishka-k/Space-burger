import React from "react";

import PropTypes from 'prop-types';
import IngredientProperty from "../ingredient-property/ingredient-property";

import styles from "./ingredient-details.module.css"

const IngredientDetails = ({showIngredient}) => {
   
  return (
    <div className={styles.content}>
      <img src={showIngredient.image} alt={showIngredient.name} className={`mb-4 ${styles.image}`} />
      <p className="text text_type_main-medium mb-8">{showIngredient.name}</p>
      <ul className={`${styles.properties} mb-15 `}>
        <IngredientProperty name = {"Калории,ккал"} value={showIngredient.calories}/>
        <IngredientProperty name = {"Белки, г"} value={showIngredient.proteins}/>
        <IngredientProperty name = {"Жиры, г"} value={showIngredient.fat}/>
        <IngredientProperty name = {"Углеводы, г"} value={showIngredient.carbohydrates}/>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
    showIngredient: PropTypes.object.isRequired,
  };

export default IngredientDetails;

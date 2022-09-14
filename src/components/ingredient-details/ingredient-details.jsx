import IngredientProperty from "../ingredient-property/ingredient-property";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./ingredient-details.module.css";

export const IngredientDetails = ({title}) => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <>
      {ingredient && (
        <div className={styles.content}>
          <h2 className={`text text_type_main-large mt-30 ${styles.title}`}>
            {title}
          </h2>
          <img src={ingredient.image} alt={ingredient.name} className={`mb-4 ${styles.image}`} />
          <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
          <ul className={`${styles.properties} mb-15 `}>
            <IngredientProperty name={"Калории,ккал"} value={ingredient.calories} />
            <IngredientProperty name={"Белки, г"} value={ingredient.proteins} />
            <IngredientProperty name={"Жиры, г"} value={ingredient.fat} />
            <IngredientProperty name={"Углеводы, г"} value={ingredient.carbohydrates} />
          </ul>
        </div>
      )}
    </>
  );
};


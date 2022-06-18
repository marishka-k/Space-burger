import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-block.module.css";
import PropTypes from "prop-types";

const BurgerIngredientsBlock = ({ title, titleId, ingredients }) => {
  return (
    <div>
      <h2 className="text text_type_main-medium mb-6" id={titleId}>
        {title}
      </h2>
      <ul className={`mt-6 ml-4 ${styles.items}`}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
          );
        })}
      </ul>
    </div>
  );
};

BurgerIngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
};

export default BurgerIngredientsBlock;

import { FC } from "react";

import styles from "./ingredient-property.module.css";

type TIngredientProperty = {
  name: string,
  value: number,
};

const IngredientProperty: FC<TIngredientProperty> = ({ name, value }) => {
  return (
    <li className={styles.property}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {name}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </li>
  );
};

export default IngredientProperty;

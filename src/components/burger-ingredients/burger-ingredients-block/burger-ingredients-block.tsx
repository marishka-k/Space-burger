import { FC, useMemo} from "react";
import { useSelector } from "../../../services/types";

import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";

import styles from "./burger-ingredients-block.module.css";
import { TIngredient } from "../../../services/types/data";

type TIngredientsBlock = {
	ingredients: Array<TIngredient>;
  title: string
	titleId: string;  
}
interface IRoutesMap {
  [counters: string]: number;
}


const BurgerIngredientsBlock: FC <TIngredientsBlock> = 
  ({ title, titleId, ingredients }) => {
    const burgerConstructor = useSelector((state) => state.burgerConstructor);

    const counterOfIngredient = useMemo (() => {
      const { bun, fillings } = burgerConstructor;
      const counters = {} as IRoutesMap;

      fillings.forEach((ingredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
    }, [burgerConstructor]);

    return (
      <>
        <h2 className="text text_type_main-medium mb-6" id={titleId}>
          {title}
        </h2>
        <ul className={`mt-6 ml-4 ${styles.items}`}>
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient._id}>
                <BurgerIngredient
                  ingredient={ingredient}
                  count={counterOfIngredient[ingredient._id]}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
;

export default BurgerIngredientsBlock;

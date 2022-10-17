import { FC, useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "../../services/types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsBlock from "./burger-ingredients-block/burger-ingredients-block";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const [current, setCurrent] = useState("bun");

  const bunList = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const sauceList = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const mainList = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const [bunRef, bunInView] = useInView({
    threshold: 0,
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0,
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (bunInView) {
      setCurrent("bun");
    } else if (sauceInView) {
      setCurrent("sauce");
    } else if (mainInView) {
      setCurrent("main");
    }
  }, [bunInView, sauceInView, mainInView]);

  const Tabs = () => {
    const curentTarget = (id: string) => {
      setCurrent(id);
      const menuTarget = document.getElementById(id) as HTMLElement;
      menuTarget.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div className={`mb-10 ${styles.tab}`}>
        <Tab value="bun" active={current === "bun"} onClick={curentTarget}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={curentTarget}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={curentTarget}>
          Начинки
        </Tab>
      </div>
    );
  };

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.scroller}`}>
        <div ref={bunRef}>
          <BurgerIngredientsBlock title={"Булки"} titleId={"bun"} ingredients={bunList}/>
        </div>
        <div ref={sauceRef}>
          <BurgerIngredientsBlock title={"Соусы"} titleId={"sauce"} ingredients={sauceList}/>
        </div>
        <div ref={mainRef}>
          <BurgerIngredientsBlock title={"Начинки"} titleId={"main"} ingredients={mainList}/>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;

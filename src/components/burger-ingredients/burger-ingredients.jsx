import { useState, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsBlock from "../burger-ingredients-block/burger-ingredients-block";
import Modal from "../modal/modal";
import { closeIngredientModal } from "../../services/actions/ingredient-details";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
  const openIngredientDetailsModal = useSelector((store) => store.ingredientDetails.openModal);
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

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  const Tabs = () => {
    const curentTarget = (id) => {
      setCurrent(id);
      const menuTarget = document.getElementById(id);
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
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <Tabs />
        <div className={`${styles.scroller}`}>
          <BurgerIngredientsBlock
            title={"Булки"}
            titleId={"bun"}
            ingredients={bunList}
            ref={bunRef}
          />

          <BurgerIngredientsBlock
            title={"Соусы"}
            titleId={"sauce"}
            ingredients={sauceList}
            ref={sauceRef}
          />

          <BurgerIngredientsBlock
            title={"Начинки"}
            titleId={"main"}
            ingredients={mainList}
            ref={mainRef}
          />
        </div>
      </section>
      {!!openIngredientDetailsModal && (
        <Modal
          onClickClose={handleCloseIngredientDetailsModal}
          title="Детали ингредиента"
        >
          <IngredientDetails showIngredient={openIngredientDetailsModal} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;

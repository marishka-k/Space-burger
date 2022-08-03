import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsBlock from "../burger-ingredients-block/burger-ingredients-block";
import Modal from "../modal/modal";
import { closeIngredientModal } from "../../services/actions/ingredient-details";

import IngredientPropTypes from "../../utils/types";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const dispatch = useDispatch();
  const openIngredientDetailsModal = useSelector(
    (store) => store.ingredientDetails.openModal
  );

  const bunList = [];
  const sauceList = [];
  const mainList = [];

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  ingredients.map((ingredient) => {
    if (ingredient.type === "bun") {
      bunList.push(ingredient);
      return bunList;
    } else if (ingredient.type === "sauce") {
      sauceList.push(ingredient);
      return sauceList;
    } else {
      mainList.push(ingredient);
      return mainList;
    }
  }, []);

  const Tabs = () => {
    const [current, setCurrent] = React.useState("bun");

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
          />
          <BurgerIngredientsBlock
            title={"Соусы"}
            titleId={"sauce"}
            ingredients={sauceList}
          />
          <BurgerIngredientsBlock
            title={"Начинки"}
            titleId={"main"}
            ingredients={mainList}
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

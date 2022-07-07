import React from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsBlock from "../burger-ingredients-block/burger-ingredients-block";
import Modal from "../modal/modal";

import IngredientPropTypes from "../../utils/types";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = (props) => {
  const [modalActive, setModalActive] = React.useState(false);
     
  const closeModal = () => {
    setModalActive (false)
  }
  
  const bunList = [];
  const sauceList = [];
  const mainList = [];

  props.data.map((ingredient) => {
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
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.scroller}`}>
        <BurgerIngredientsBlock
          title={"Булки"}
          titleId={"bun"}
          ingredients={bunList}
          clickOnTheBlock={setModalActive}
        />
        <BurgerIngredientsBlock
          title={"Соусы"}
          titleId={"sauce"}
          ingredients={sauceList}
          clickOnTheBlock={setModalActive}
        />
        <BurgerIngredientsBlock
          title={"Начинки"}
          titleId={"main"}
          ingredients={mainList}
          clickOnTheBlock={setModalActive}
        />
      </div>
    </section>
    {modalActive  &&(
      <Modal active={Boolean (modalActive)} setActive={closeModal} title='Детали ингредиента'>
        <IngredientDetails showIngredient={modalActive} />
      </Modal>
    )}
    </>  
  );
};


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
}

export default BurgerIngredients;

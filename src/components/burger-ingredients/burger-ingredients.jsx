import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import BurgerIngredientsBlock from "../burger-ingredients-block/burger-ingredients-block";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
  let bunList = [];
  let sauceList = [];
  let mainList = [];

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
      <div className="mb-10" style={{ display: "flex" }}>
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
      <div className={`${BurgerIngredientsStyle.scroller}`}>
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
  );
};

export default BurgerIngredients;

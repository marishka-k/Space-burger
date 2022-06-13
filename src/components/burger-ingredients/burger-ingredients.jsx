import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";


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
    const [current, setCurrent] = React.useState("Булки");
    
 /*    const curentTarget = (id) => {
        const menuTarget = document.querySelector(`#` + id);
        menuTarget.scrollIntoView({
            behavior: "smooth"
        });
        setCurrent(id);
    }; */
    return (
        <div className={BurgerIngredient.menu} style={{ display: 'flex' }}>
            <Tab value="bun" active={current === "Булки"} onClick={setCurrent}> Булки </Tab>
            <Tab value="sauce" active={current === "Соусы"} onClick={setCurrent}> Соусы </Tab>
            <Tab value="main" active={current === "Начинки"} onClick={setCurrent}> Начинки </Tab>
        </div>
    )
    }   

  return (
    <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs/>
      <div className={BurgerIngredientsStyle.scroller}>
        <h2>Булки</h2>
        <ul className={`mt-6 ml-4 ${BurgerIngredientsStyle.items}`}>
          {bunList.map((ingredient) => {
            return (
              <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
            );
          })}
        </ul>
        <h2>Соусы</h2>
        <ul className={BurgerIngredientsStyle.items}>
          {sauceList.map((ingredient) => {
            return (
              <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
            );
          })}
        </ul>
        <h2>Начинки</h2>
        <ul className={BurgerIngredientsStyle.items}>
          {mainList.map((ingredient) => {
            return (
              <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;

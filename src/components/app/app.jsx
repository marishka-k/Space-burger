import React, { useEffect } from "react";
import app from "./app.module.css";
import getBurgerIngredients from "../../utils/api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { data } from "../../utils/data";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    getBurgerIngredients()
      
      .then(setIngredients)
      .catch(() => console.log("ошибка при загрузке ингредиентов с сервера"));
  },[])

  console.log(ingredients.data);
 

  return (
    <>
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;

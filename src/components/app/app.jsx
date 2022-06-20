import React from "react";
import app from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { data } from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data}/>
      </main>
    </>
  );
}

export default App;
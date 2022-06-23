import React, { useEffect } from "react";
import app from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { data } from "../../utils/data";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    const config = {
      url: "https://norma.nomoreparties.space/api/ingredients",
      headers: {
        "Content-type": "application/json",
      },
    };

    const onRes = (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    };

    const fetchData = () => {
      fetch(config.url, {
        method:"GET",
        headers: config.headers,
      })
        .then(onRes)
        .then((res) => {
         const ingredientsData = res.data
          setIngredients(ingredientsData)});
    };
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
    </>
  );
}

export default App;

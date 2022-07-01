import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BURGER_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    const config = {
      url: BURGER_URL,
      headers: {
        "Content-type": "application/json",
      },
    };

    const fetchData = () => {
      fetch(`${config.url}/ingredients`, {
        method: "GET",
        headers: config.headers,
      })
        .then(checkResponse)
        .then((res) => {
          const ingredientsData = res.data;
          setIngredients(ingredientsData);
        })
        .catch(() =>
          console.log("Во время загрузки ингредиентов произошла ошибка")
        );
    };
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
    </>
  );
}

export default App;

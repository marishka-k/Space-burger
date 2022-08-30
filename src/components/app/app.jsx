import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation } from "react-router-dom";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getBurgerIngredients } from "../../services/actions/ingredients";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile } from "../../pages/profile/profile";

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <Switch location={background ||  location}>
        <Route path="/" exact>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <ProtectedRoute path='/profile'>
            <Profile/>
        </ProtectedRoute>

        <ProtectedRoute path='/feed'>
            <p>Feed </p>
        </ProtectedRoute>

      </Switch>
    </div>
  );
}

export default App;

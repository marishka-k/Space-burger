import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getBurgerIngredients } from "../../services/actions/ingredients";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile } from "../../pages/profile/profile";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { checkUzerAuth } from "../../services/actions/auth";
import { NotFound404 } from "../../pages/not-found-404/not-found-404";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { closeIngredientModal } from "../../services/actions/ingredient-details";
import Modal from "../modal/modal";

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();
  

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace('/');
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUzerAuth());
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <ProtectedRoute notAuthOnly={true} path="/login" exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute notAuthOnly={true} path="/register" exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute notAuthOnly={true} path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute notAuthOnly={true} path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path="/feed" exact>
          <p>Feed </p>
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
          <Route path='/ingredients/:id' exact={true}>
            <Modal
              title='Детали ингредиента'
              onClickClose={handleCloseIngredientDetailsModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        )
        }
      
    </div>
  );
}

export default App;

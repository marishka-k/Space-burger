import { useCallback, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types";
import { TLocation } from "../../services/types/data";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { Profile } from "../../pages/profile/profile";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { NotFound404 } from "../../pages/not-found-404/not-found-404";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Feed } from "../../pages/feed/feed";
import { OrdersInfo } from "../orders-info/orders-info";
import { Preloader } from "../preloader/preloader";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookie";
import { closeIngredientModal, closeOrderInfoModal } from "../../services/actions/colse-modal";
import { checkUzerAuth, updateToken } from "../../services/actions/auth";
import { getBurgerIngredients } from "../../services/actions/ingredients";

import styles from "./app.module.css";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const isLoading = useSelector((store) => store.burgerIngredients);
  const location = useLocation<TLocation>();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = getCookie("token");
  const token = localStorage.getItem("refreshToken");

  const idOrderInfo = useRouteMatch<{ [id: string]: string } | null>([
    "/profile/orders/:id",
    "/feed/:id",
  ])?.params?.id;

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace("/");
  }, [dispatch]);

  const handleCloseOrderInfoDetailsModal = useCallback(() => {
    dispatch(closeOrderInfoModal());
    history.goBack();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUzerAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && token) {
      dispatch(updateToken());
    }
  }, [dispatch, token, cookie]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          {isLoading ? (
            <Preloader />
          ) : (
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          )}
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrdersInfo />
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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrdersInfo />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails title="Детали ингредиента" />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id" exact>
          <Modal
            title="Детали ингредиента"
            onClickClose={handleCloseIngredientDetailsModal}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && idOrderInfo && (
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Modal onClickClose={handleCloseOrderInfoDetailsModal}>
            <OrdersInfo />
          </Modal>
        </ProtectedRoute>
      )}
      {background && idOrderInfo && (
        <Route path="/feed/:id" exact>
          <Modal onClickClose={handleCloseOrderInfoDetailsModal}>
            <OrdersInfo />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;

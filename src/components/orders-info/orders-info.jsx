
import {useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrdersInfoDetails } from "./orders-info-details/orders-info-details";
import { formatDate } from "../../utils/format-date";
import { getCookie } from "../../utils/cookie";
import { feedConnectionClosed, feedConnectionInit } from "../../services/actions/feed";
import { ordersConnectionClosed, ordersConnectionInit } from "../../services/actions/orders";

import styles from "./orders-info.module.css";

export const OrdersInfo = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { id } = useParams();
  const isProfile = "/profile/orders/:id";
  const isFeed = "/feed/:id"; 

  const location = useLocation();
  const background = location.state?.background;
 

  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
  const feedOrders = useSelector((store) => store.wsFeed.orders);
  const profileOrders = useSelector((store) => store.wsOrders.orders);
  
  let orders = match.path === isProfile ? profileOrders : feedOrders;
  let order = orders?.find((order) => order._id === id);
  
  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item.price);
    }, 0);
  }, [orderIngredientsData]);

  useEffect(() => {
    if (!order) {
      if (match.path === isProfile) {
        dispatch(ordersConnectionInit(`?token=${getCookie("token")}`));
      }
      if (match.path === isFeed) {
        dispatch(feedConnectionInit("/all"));
      }
    }
    return () => {
      if (match.path === isProfile) {
        dispatch(ordersConnectionClosed());
      }
      if (match.path === isFeed) {
        dispatch(feedConnectionClosed());
      }
    };
  }, [dispatch, order, match.path, match.url]);

  return (
    <>
      {order && (
        <div className={styles.container}>
          {background && (<p className="text text_type_digits-default pb-10 pt-5">#{order.number}</p>)}
          {!background && (<p className={`${styles.order} text text_type_digits-default pb-10 mt-30`}>#{order.number}</p>)}
          <h2 className="text text_type_main-medium pb-3">
            {order.name}
          </h2>
          {!!order.status && (
            <p className={`${styles.status} text text_type_main-default pb-15`}>
              { order.status === "pending"
                ? "Готовится"
                : order.status === "created"
                ? "Создан"
                : "Выполнен"}
            </p>
          )}
          <h3 className={`text text_type_main-medium pb-6`}>
            Состав:
          </h3>
          <div>
            <OrdersInfoDetails details={orderIngredientsData}/>
          </div>
          <div className={`${styles.total} pt-10`}>
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </p>
            <div className={styles.price}>
              <p className="text text_type_digits-default pr-2">
                {orderTotalPrice}
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

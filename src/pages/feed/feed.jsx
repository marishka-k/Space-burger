import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Orders } from "../../components/orders/orders";
import { Preloader } from "../../components/preloader/preloader";
import { OrdersStatuses } from "../../components/orders-status/orders-statuses";
import { feedConnectionClosed, feedConnectionInit } from "../../services/actions/feed";

import styles from "./feed.module.css";


export const Feed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsFeed.orders);

  useEffect(() => {
    dispatch(feedConnectionInit("/all"));
    return () => {
      dispatch(feedConnectionClosed());
    };
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <div className={styles.feed}>
      <h2 className="text text_type_main-large pt-10 pb-5">Лента заказов</h2>
      <div className={styles.container}>
        <Orders />
        <OrdersStatuses />
      </div>
    </div>
  );
};

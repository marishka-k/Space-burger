import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrderBlock } from "../../../components/orders/order-block/order-block";
import styles from "./orders.module.css";

export const Orders = () => {
  const location = useLocation();
  const orders  = useSelector((store) => store.wsOrders.orders);
  
  return (
    <div className={styles.scroller}>
      {orders &&
        orders?.map((order) => {
          return (
            <Link
              to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }}
              className={`${styles.link} mb-2`}
              key={order._id}
            >
              <OrderBlock order={order} status={true} />
            </Link>
          );
        })}
    </div>
  );
};

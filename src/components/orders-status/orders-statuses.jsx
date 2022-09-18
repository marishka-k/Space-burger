import { useSelector } from "react-redux";

import { nanoid } from "nanoid";

import styles from "./orders-statuses.module.css";

export const OrdersStatuses = () => {
  const { total, totalToday, orders } = useSelector((store) => store.wsFeed);

  const doneStatusOrders = orders
    .filter((order) => order.status === "done")
    .filter((order, index) => index < 21);
  const pendingStatusOrders = orders
    .filter((order) => order.status === "pending")
    .filter((order, index) => index >= 10);

  return (
    <div className={styles.container}>
      <div className={`${styles.orderBoard}`}>
        <div>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.order_list}>
            {doneStatusOrders.map((order) => {
              return (
                <li className={`${styles.finished} text text_type_digits-default pb-2`} key={nanoid()}>
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.order_list}>
            {pendingStatusOrders.map((order) => {
              return (
                <li className="text text_type_digits-default" key={nanoid()}>
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h2 className={`text text_type_digits-large ${styles.total} `}>
          {total}
        </h2>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h2 className={`text text_type_digits-large ${styles.total}`}>
          {totalToday}
        </h2>
      </div>
    </div>
  );
};

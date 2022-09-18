import { useMemo } from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { OrderImage } from "../../orders/order-block/order-image/order-image";

import styles from "./orders-info-details.module.css";

export const OrdersInfoDetails = ({ details }) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const count = (elem) => {
    let count = details.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredient = useMemo(() => {
    return details?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [details, ingredients]);

  return (
    <ul className={styles.scroller}>
      {orderIngredient &&
        [...new Set(orderIngredient)].map((item) => {
          return (
            <li className={`${styles.item} pr-6`} key={nanoid()}>
              {item && (
                <>
                  <div className={styles.info}>
                    <OrderImage image={item.image} alt={item.name} />
                    <p className={`${styles.name} text text_type_main-default pl-4`}>
                      {item.name}
                    </p>
                  </div>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                      {item.type === "bun"
                        ? `${count(item)*2} x ${item.price}`
                        : `${count(item)} x ${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </>
              )}
            </li>
          );
        })}
    </ul>
  );
};

OrdersInfoDetails.propTypes = {
  details: propTypes.array.isRequired,
};

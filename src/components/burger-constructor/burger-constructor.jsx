import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import styles from "./burger-constructor.module.css";
import { addItemToConstructor } from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  console.log(bun);
  console.log(ingredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (item) => {
      dispatch(addItemToConstructor(item.ingredient));
    },
  });

  const [modalActive, setModalActive] = React.useState(false);
  const bunPrice = bun !== null ? bun.price * 2 : 0;

  const totalPrice = ingredients.length !== 0 ? ingredients.reduce((acc, p) => acc + p.price, bunPrice) : 0;

  return (
    <section className={`${styles.constructor} pt-25 pl-4`} ref={dropTarget}>
      {bun === null ? (
        <p className="text text_type_main-large">Необходимо добавить булку</p>
      ) : (
        <div className="ml-8 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
      )}
      {ingredients.length === 0 ? (
        <p className="text text_type_main-large">
          Необходимо добавить ингредиенты
        </p>
      ) : (
        <ul className={styles.scroller}>
          {ingredients.map((ingredient) => {
            return (
              <li className={styles.filling} key={ingredient.id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          })}
        </ul>
      )}
      {bun === null ? (
        <p className="text text_type_main-large">Необходимо добавить булку</p>
      ) : (
        <div className="ml-8 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
      )}
      <div className={`${styles.total_container} mt-10 mr-4`}>
        <p className={"text text_type_digits-medium"}>{totalPrice}</p>
        <span className={`${styles.total_price_icon} mr-10`}>
          <CurrencyIcon type="primary" />
        </span>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => setModalActive(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;

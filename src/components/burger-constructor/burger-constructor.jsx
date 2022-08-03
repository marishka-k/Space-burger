import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import styles from "./burger-constructor.module.css";
import { addItemToConstructor } from "../../services/actions/constructor";


const BurgerConstructor = () => {
  const burgerIngredients = useSelector((state) => state.burgerConstructor);  



  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (item) => {
      dispatch(addItemToConstructor(item.ingredient));
    },
  });

  const [modalActive, setModalActive] = React.useState(false);
  const bunPrice = burgerIngredients.bun !== null ? burgerIngredients.bun.price * 2 : 0;

  const totalPrice = burgerIngredients.fillings.length !== 0 ? burgerIngredients.fillings.reduce((acc, p) => acc + p.price, bunPrice) : 0;

  return (
    <section className={`${styles.constructor} pt-25 pl-4`} ref={dropTarget}>
      {burgerIngredients.bun === null ? (
        <p className="text text_type_main-large">Необходимо добавить булку</p>
      ) : (
        <div className="ml-8 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerIngredients.bun?.name} (верх)`}
            price={burgerIngredients.bun?.price}
            thumbnail={burgerIngredients.bun?.image}
          />
        </div>
      )}
      {burgerIngredients.fillings.length === 0 ? (
        <p className="text text_type_main-large">
          Необходимо добавить ингредиенты
        </p>
      ) : (
        <ul className={styles.scroller}>
          {burgerIngredients.fillings.map((filling, index) => {
            return (
              <BurgerConstructorItem filling={filling} key={filling.id} index={index}/>
            );
          })}
        </ul>
      )}
      {burgerIngredients.bun === null ? (
        <p className="text text_type_main-large">Необходимо добавить булку</p>
      ) : (
        <div className="ml-8 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burgerIngredients.bun?.name} (низ)`}
            price={burgerIngredients.bun?.price}
            thumbnail={burgerIngredients.bun?.image}
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

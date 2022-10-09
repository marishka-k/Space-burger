import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";

import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { getCookie } from "../../utils/cookie";
import { addItemToConstructor } from "../../services/actions/constructor";
import { closeOrderDetailsModal, getOrderDetails } from "../../services/actions/order-details";
import { CONSTRUCTOR_RESET} from "../../services/action-types/constructor-types"

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const burgerIngredients = useSelector((state) => state.burgerConstructor);  
  const orderNumber = useSelector(store => store.order.number);
  const bun = burgerIngredients.bun
  const fillings = burgerIngredients.fillings
  const cookie = getCookie('token');
	const history = useHistory();

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (item) => {
      dispatch(addItemToConstructor(item.ingredient));
    },
  });
  
  const bunPrice = bun !== null ? bun.price * 2 : 0;

  const totalPrice = fillings.length !== 0 ? fillings.reduce((acc, p) => acc + p.price, bunPrice) : 0;

  const fillingsId = useMemo(
		() => fillings.map((item) => item._id),
		[fillings])

  const orderDetailsModal = (fillingsId) => {
		cookie ? dispatch(getOrderDetails(fillingsId)) : history.push('/login');
	};

  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderDetailsModal())
    dispatch({ type: CONSTRUCTOR_RESET });
  }, [dispatch]);

  return (
    <section className={`${styles.constructor} pt-25 pl-4`} ref={dropTarget}>
      {bun === null ? (
        <p className={`${styles.ingredient_absence} text text_type_main-medium mt-4 mb-4 p-4`}>Нужно добавить булки</p>
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
      {fillings.length === 0 ? (
        <p className={`${styles.ingredient_absence} text text_type_main-medium  mt-4 mb-4 p-4`}>Нужно добавить ингредиенты</p>
      ) : (
        <ul className={styles.scroller}>
          {fillings.map((filling, index) => {
            return (
              <BurgerConstructorItem filling={filling} key={filling.id} index={index}/>
            );
          })}
        </ul>
      )}
      {bun === null ? (
        <p className={`${styles.ingredient_absence} text text_type_main-medium mt-4 mb-4 p-4`}>Нужно добавить булки</p>
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
        {(fillings.length === 0 || bun === null)
					? (<Button
						type="primary"
						size="large"
						onClick={() => { orderDetailsModal(fillingsId) }}
						disabled
					>
						Оформить заказ
					</Button>)
					: (<Button
						type="primary"
						size="large"
						onClick={() => { orderDetailsModal(fillingsId) }}
					>
						Оформить заказ
					</Button>)}
        </div>
      </div>
      {!!orderNumber &&
        <Modal onClickClose={handleCloseOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;

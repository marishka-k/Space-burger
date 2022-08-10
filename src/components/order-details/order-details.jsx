import { useSelector } from 'react-redux';

import styles from "./order-details.module.css";

const OrderDetails = () => {
  const  orderNumber  = useSelector(store => store.order.number);
  return (
    <div className={styles.details}>
      <p className="text text_type_digits-large mt-30 mb-8">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <span className={`mb-15 ${styles.check}`}> </span>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;

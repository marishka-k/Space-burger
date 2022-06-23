import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';


const BurgerConstructor = (props) => {
  const bun = props.data.find((item) => item.type === "bun");
  let totalPrice = bun?.price
  return (
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <div className="ml-8 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun?.name} (верх)`}
          price={bun?.price}
          thumbnail={bun?.image}
        />
      </div>
      <ul className={styles.scroller}>
        {props.data.map((ingredient, index) => {
         if (ingredient.type !== "bun") {
            totalPrice = totalPrice + ingredient.price           
          return (
            <li className={styles.filling} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          );
        }
        })}
      </ul>
      <div className="ml-8 mt-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun?.name} (низ)`}
          price={bun?.price}
          thumbnail={bun?.image}
        />
      </div>
      <div className={`${styles.total_container} mt-10 mr-4`}>
        <p className={'text text_type_digits-medium'}>
          {totalPrice}          
        </p>
        <span className={`${styles.total_price_icon} mr-10`}>
        <CurrencyIcon type="primary"/>
        </span>
        <div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;

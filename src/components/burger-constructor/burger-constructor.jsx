import React from 'react';
import  {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"

const BurgerConstructor = (props) => {
   
    const bun = props.data.find(item => item.type === 'bun');
    
    return (
        <section className={`${styles.constructor} pt-25`}>
            
            <div className='ml-8'>
            <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            />
            </div>
            <ul className={styles.scroller}>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
                <li className={styles.filling}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={DragIcon}
                    />
                </li>
            </ul>
            <div className='ml-8'>
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            />
            </div>
            <div className={styles.totalContainer}>
                <p className={`${styles.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                {12345}
                 <CurrencyIcon type="primary"/>
                </p>
                <div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
      </section>
    )
}

export default BurgerConstructor


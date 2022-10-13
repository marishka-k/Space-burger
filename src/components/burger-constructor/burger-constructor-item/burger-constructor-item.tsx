import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { CONSTRUCTOR_DELETE, CONSTRUCTOR_MOVE } from "../../../services/action-types/constructor-types";

import styles from "./burger-constructor-item.module.css";
import { TConstructorIngredient } from "../../../services/types/data";
import { useDispatch } from "../../../services/types";

type TConstructorItems = {
	index: number;
	filling: TConstructorIngredient;
}

type TDragItem = {
	index: number;
	type: string;
	id?: string;
};

const BurgerConstructorItem: FC<TConstructorItems> = ({ filling, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = filling.id;

  const deleteFilling = (id : string) => {
    dispatch({
      type: CONSTRUCTOR_DELETE,
      id: id,
    });
  };

  const [{ opacity }, drag] = useDrag({
    type: "fillings",
    item: { index, id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [, drop] = useDrop<TDragItem>({
    accept: "fillings",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_MOVE,
        payload: { to: dragIndex, from: hoverIndex },
      });
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li className={styles.filling} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() => deleteFilling(id)}
      />
    </li>
  );
};

export default BurgerConstructorItem;

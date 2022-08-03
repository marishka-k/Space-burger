import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";

import styles from "./burger-constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPropTypes from "../../utils/types";
import {
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_MOVE,
} from "../../services/actions/constructor";

const BurgerConstructorItem = (filling, index) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = filling.filling.id;
    
  const deleteFilling = (id) => {
    dispatch({
      type: CONSTRUCTOR_DELETE,
      id: id,
    });
  };

  const [{ opacity }, drag] = useDrag({
    type: "fillings",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [, drop] = useDrop({
    accept: "fillings",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      console.log(dragIndex);
      
      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_MOVE,
        payload: { dragIndex, hoverIndex },
      });
      item.index = hoverIndex;
    },
    
  });

  drag(drop(ref));


  return (
    <li className={styles.filling} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={filling.filling.name}
        price={filling.filling.price}
        thumbnail={filling.filling.image}
        handleClose={() => deleteFilling(id)}        
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  filling: IngredientPropTypes.isRequired,
};

export default BurgerConstructorItem;

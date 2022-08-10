import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPropTypes from "../../utils/types";
import { CONSTRUCTOR_DELETE, CONSTRUCTOR_MOVE } from "../../services/actions/constructor";

import styles from "./burger-constructor-item.module.css";


const BurgerConstructorItem = ({ filling, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = filling.id;

  const deleteFilling = (id) => {
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

  const [, drop] = useDrop({
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

BurgerConstructorItem.propTypes = {
  filling: IngredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;

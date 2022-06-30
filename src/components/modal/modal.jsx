import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ active, setActive, title, children }) => {
  React.useEffect(() => {
    const closePopupWithEsc = (evt) => {
      if (evt.key === "Escape") {
        setActive(false);
      }
    };
    window.addEventListener("keydown", closePopupWithEsc);

    return () => {
      window.removeEventListener("keydown", closePopupWithEsc);
    };
  }, [setActive]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={` ${active ? `${styles.content} ${styles.active}` : `${styles.content}`}`}>
        <h3 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>{title}</h3>
        <button className={styles.close_button} onClick={() => setActive(false)}><CloseIcon type="primary" /></button>
        {children}
      </div>
      <ModalOverlay active={active} setActive={setActive}/>
    </div>,

    modalRoot
  );
};

Modal.propTypes = {
    active: PropTypes.object.isRequired,
    setActive: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object.isRequired
}

export default Modal;

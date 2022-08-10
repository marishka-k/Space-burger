import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

const Modal = ({ onClickClose, title, children }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const closePopupWithEsc = (evt) => {
      if (evt.key === "Escape") {
        onClickClose();
      }
    };
    window.addEventListener("keydown", closePopupWithEsc);

    return () => {
      window.removeEventListener("keydown", closePopupWithEsc);
    };
  }, [onClickClose]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>
          {title}
        </h3>
        <button className={styles.close_button} onClick={onClickClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClickClose={onClickClose} />
    </div>,

    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
  onClickClose: PropTypes.func.isRequired
};

export default Modal;

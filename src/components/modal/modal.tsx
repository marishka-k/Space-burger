import {FC, useEffect } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import { TModal } from "../../services/types/data";

const Modal: FC<TModal> = ({ onClickClose, title, children }) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  useEffect(() => {
    const closePopupWithEsc = (evt: {key: string}) => {
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
      <div className={`${styles.content} p-10`}>
        {title && (
          <h3 className={`text text_type_main-large mt-4 ${styles.title}`}>
            {title}
          </h3>
        )}
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

export default Modal;

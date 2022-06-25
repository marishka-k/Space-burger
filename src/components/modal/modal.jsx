import React from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'

const Modal = ({active, setActive, children}) => {
return  (
    <div className={active ? `${styles.modal} ${styles.active}`: `${styles.modal}` } onClick = {() => setActive(false)}>
        <div className={` ${active ? `${styles.content} ${styles.active}`: `${styles.content}`}`} onClick = {evt => evt.stopPropagation()} >
            <button className={styles.close_button} onClick = {() => setActive(false)}> <CloseIcon type="primary" /> </button>
            {children}
        </div>
    </div>

)    
}

export default Modal
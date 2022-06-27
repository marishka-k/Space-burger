import React from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ active, setActive }) => {
  
  return (
    <div className={active ? `${styles.overlay} ${styles.overlay_active}` : `${styles.overlay}`} onClick = {() => setActive(false)}/>
  );
};

export default ModalOverlay;

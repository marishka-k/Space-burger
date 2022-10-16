import {FC} from "react";
import { TModalOverlay } from '../../../services/types/data';

import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<TModalOverlay> = ({onClickClose}) => {
  
  return (
    <div className={styles.overlay} onClick={onClickClose} />
  );
};

export default ModalOverlay;

import { FC } from "react";
import styles from "./order-image.module.css";

type TOrderImage = {
  image: string;
  alt: string;
}

export const OrderImage: FC<TOrderImage> = ({ image, alt }) => {
  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <img className={styles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};
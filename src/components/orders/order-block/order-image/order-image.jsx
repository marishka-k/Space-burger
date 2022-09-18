import propTypes from "prop-types";
import styles from "./order-image.module.css";

export const OrderImage = ({ image, alt }) => {
  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <img className={styles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

OrderImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};

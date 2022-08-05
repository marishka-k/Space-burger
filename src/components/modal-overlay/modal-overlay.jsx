import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({onClickClose}) => {
  
  return (
    <div className={styles.overlay} onClick={onClickClose} />
  );
};

ModalOverlay.propTypes = {
	onClickClose: PropTypes.func.isRequired
}

export default ModalOverlay;

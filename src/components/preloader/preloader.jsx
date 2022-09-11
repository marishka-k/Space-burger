import styles from "./preloader.module.css";

export const Preloader = () => {
  return (
    <div className={`${styles.box}`}>
      <div className={styles.loader}>
        <div className={styles.o} />
        <div className={styles.o} />
        <div className={styles.o} />
        <div className={styles.o} />
      </div>
    </div>
  );
};

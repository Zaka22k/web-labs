import styles from "./Card.module.css";
import classNames from "classnames";

const Card = ({ className = "", children, onCardClick, cardRef }) => {
  return (
    <section
      ref={cardRef}
      onClick={onCardClick}
      className={classNames(styles.card, className)}
    >
      {children}
    </section>
  );
};

export default Card;

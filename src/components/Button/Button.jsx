import styles from 'styles.module.css';
import PropTypes from 'prop-types';


export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={styles.Button}>
      <span className="button-label">Load more</span>
    </button>
  );
};

Button.propTypes= {
  onClick: PropTypes.func.isRequired
}
import styles from 'styles.module.css';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

export const Modal = ({ close, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  });

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  return (
    <div onClick={closeModal} className={styles.Overlay}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

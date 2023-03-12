import styles from 'styles.module.css';
import PropTypes from 'prop-types';

import { Component } from 'react';

export class Modal extends Component {

  componentDidMount(){
    document.addEventListener("keydown", this.closeModal)
}

  closeModal = ({target, currentTarget, code}) => {
    if(target === currentTarget || code === "Escape") {
        this.props.close()
    }
}

componentWillUnmount() {
  document.removeEventListener("keydown", this.closeModal)
}


  render() {
    const {closeModal} = this;
    const { children } = this.props;
    return (
      <div onClick={closeModal} className={styles.Overlay}>
        <div className={styles.Modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  target:PropTypes.string.isRequired,
  currentTarget: PropTypes.string.isRequired
}

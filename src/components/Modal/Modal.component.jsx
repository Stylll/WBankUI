import React from 'react';
import PropTypes from 'prop-types';

import './Modal.styles.scss';

const Modal = (props) => {
  const {
    children, isModalVisible, handleModalClose,
    customContentClass,
  } = props;

  const onModalClose = () => {
    return handleModalClose();
  };

  const renderModal = () => (
    <div className="modal-container">
      <div className="close-btn" data-testid="modal-close" onClick={onModalClose}>
        &times;
      </div>
      <div className={`content ${customContentClass}`}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="modal">
      {isModalVisible && renderModal()}
    </div>
  );
};

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  customContentClass: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  isModalVisible: false,
  customContentClass: '',
};

export default Modal;

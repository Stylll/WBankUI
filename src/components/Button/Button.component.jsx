import React from 'react';
import PropTypes from 'prop-types';

import './Button.styles.scss';
import Loader from '../Loader/Loader.component';

const Button = (props) => {
  const {
    title, handleClick, disabled, customClassName,
    customStyles, buttonType, showLoader, dataTestId,
  } = props;

  const loaderStyles = {
    width: '10px',
    height: '10px',
  };

  return (
    <div className="btn-button">
      <button data-testid={dataTestId} type={buttonType} className={`button ${customClassName}`}
        style={customStyles} onClick={handleClick} disabled={disabled}
      >
        {showLoader ? <Loader customStyles={loaderStyles} /> : title}
      </button>
    </div>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  customClassName: PropTypes.string,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  showLoader: PropTypes.bool,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  handleClick: () => {},
  buttonType: 'submit',
  customClassName: '',
  disabled: false,
  showLoader: false,
  dataTestId: 'button',
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

import './Loader.styles.scss';

const Loader = (props) => {
  const { customStyles, message, containerClassName } = props;

  return (
    <div className={`loader-container ${containerClassName}`}>
      <div className="loader" style={customStyles} />
      {message && <span className="message">{message}</span>}
    </div>
  );
};

Loader.propTypes = {
  customStyles: PropTypes.object,
  containerClassName: PropTypes.string,
  message: PropTypes.string,
};

Loader.defaultProps = {
  customStyles: {},
  containerClassName: '',
};

export default Loader;

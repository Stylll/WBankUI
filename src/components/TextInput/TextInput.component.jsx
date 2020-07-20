import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.styles.scss';

const TextInput = ({
  id, name, value, title, type, placeholder,
  onChange, info, error, required, dataTestId,
}) => {
  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;
  return (
    <div className="form-input">
                <div className="title">{title}</div>
                <input type={type} name={name} data-testid={dataTestId}
                    id={id} className="text-input" placeholder={newPlaceholder}
                    onChange={onChange} value={value}
                />
          {!error && <span className="info">{info}</span>}
          {error && <span className="error" id={`${name}-error`}>{error}</span>}
</div>
  );
};

// proptypes
TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

TextInput.defaultProps = {
  id: '',
  title: '',
  info: '',
  required: false,
  dataTestId: 'textinput',
};

export default TextInput;

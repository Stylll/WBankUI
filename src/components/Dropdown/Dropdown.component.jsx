import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.styles.scss';

const Dropdown = ({
  name, value, placeholder, onChange, info,
  error, required, styles, options, disabled,
  optionsValueProperty, optionsTitleProperty,
  dataTestId,
}) => {
  const iconClassName = disabled ? 'chevy disabled' : 'chevy';

  return (
    <div className="drop-down">
      <select className="select" required={required}
        onChange={onChange} name={name} value={value} style={styles}
        disabled={disabled} data-testid={dataTestId}
      >
        <option value="">{placeholder}</option>
        {options.map(
          (option, index) => (
            <option
              value={option[optionsValueProperty]}
              key={index}
            >
              {option[optionsTitleProperty]}
            </option>),
        )}
      </select>
      <span className={iconClassName}>
        &or;
      </span>
      {!error && <span className="info">{info}</span>}
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  optionsTitleProperty: PropTypes.string.isRequired,
  optionsValueProperty: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
};

Dropdown.defaultProps = {
  disabled: false,
  dataTestId: 'dropdown',
};

export default Dropdown;

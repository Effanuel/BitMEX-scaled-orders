import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './InputField.module.css';

import { InputGroup, FormControl } from 'react-bootstrap';

const InputField = memo(({ id, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <InputGroup>
        <FormControl
          pattern="[0-9]*"
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
    </div>
  );
});

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export { InputField };

import React from "react";
import PropTypes from "prop-types";
import "./InputField.module.css";

import { InputGroup, FormControl } from "react-bootstrap";

const InputField = ({ id, label, value, onChange }) => {
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
        />
      </InputGroup>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default InputField;

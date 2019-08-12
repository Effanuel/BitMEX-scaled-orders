import React from "react";
import "./InputField.module.css";

import { InputGroup, FormControl } from "react-bootstrap";

const InputField = ({ id, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <InputGroup>
        <FormControl type="number" id={id} value={value} onChange={onChange} />
      </InputGroup>
    </div>
  );
};

export default InputField;

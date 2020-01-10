import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

import "./InputField.module.css";

type Props = {
  id: string;
  label: string;
  value: any;
  onChange: (arg0: any) => void;
};

function InputField({ id, label, value, onChange }: Props) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <InputGroup>
        <FormControl
          // pattern="[0-9]*"
          type="number"
          id={id}
          value={value || ""}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
    </div>
  );
}

export { InputField };

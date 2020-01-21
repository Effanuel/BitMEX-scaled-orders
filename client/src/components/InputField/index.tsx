import React from "react";
// COMPONENTS
import { InputGroup, FormControl } from "react-bootstrap";
// UTILS
import "./InputField.module.css";

type Props = {
  id: string;
  label: string;
  value: any;
  stop: boolean;
  onChange: (arg0: any) => void;
};

function InputField({ id, label, value, stop = false, onChange }: any) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <InputGroup>
        <FormControl
          // pattern="[0-9]*"
          style={stop ? { borderColor: "#cf6679" } : {}}
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

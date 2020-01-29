import React from "react";
// COMPONENTS
import {
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
// UTILS
import "./InputField.module.css";

type Props = {
  id: string;
  label: string;
  value: any;
  stop?: boolean;
  tooltip: any;
  t_placement?: "top" | "left" | "bottom";
  onChange: (arg0: any) => void;
};

function InputField({
  id,
  label,
  value,
  stop = false,
  tooltip,
  t_placement = "top",
  onChange
}: Props) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <OverlayTrigger
        placement={t_placement}
        overlay={<Tooltip id="tooltip-disabled">{tooltip}</Tooltip>}
      >
        <span id="icon">?</span>
      </OverlayTrigger>
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

import React from "react";
// COMPONENTS
import { FormCheck } from "react-bootstrap";
// UTILS
import styles from "./styles.module.css";

type Props = {
  label: string;
  type: "radio" | "checkbox";
  name: string;
  defaultChecked?: boolean;
};

function CustomRadioButton({ label, type, defaultChecked, name }: Props) {
  return (
    <div className={styles.label}>
      <FormCheck
        custom
        name={name}
        label={label}
        type={type}
        id={label}
        value={label}
        defaultChecked={defaultChecked}
        className={styles.label__noselect}
      />
    </div>
  );
}

export { CustomRadioButton };

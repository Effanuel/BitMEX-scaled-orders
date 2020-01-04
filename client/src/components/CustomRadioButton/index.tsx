import React from "react";
import { FormCheck } from "react-bootstrap";

import styles from "./styles.module.css";

type Props = {
  label: string;
  type: "radio" | "checkbox";
  name: string;
  defaultChecked?: boolean;
};

function CustomRadioButton({ label, type, defaultChecked, name }: Props) {
  return (
    <div className={styles.myLabel}>
      <FormCheck
        custom
        name={name}
        label={label}
        type={type}
        id={label}
        value={label}
        defaultChecked={defaultChecked}
        className={styles.noselect}
      />
    </div>
  );
}

export { CustomRadioButton };

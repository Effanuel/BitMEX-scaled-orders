import React from "react";
import { FormCheck } from "react-bootstrap";

import styles from "./styles.module.css";

type Props<T extends object> = {
  label: string;
  type: "radio" | "checkbox";
  name: string;
  defaultChecked?: boolean;
};

const CustomRadioButton = <T extends object>(props: Props<T>) => {
  const { label, type, defaultChecked, name } = props;
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
};

export { CustomRadioButton };

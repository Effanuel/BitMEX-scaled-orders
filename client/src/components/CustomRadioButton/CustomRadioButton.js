import React from "react";
import { FormCheck } from "react-bootstrap";
import styles from "./CustomRadioButton.module.css";

const CustomRadioButton = ({ label, type, name, defaultChecked }) => {
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
      />
    </div>
  );
};

export default CustomRadioButton;

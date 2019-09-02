import React from "react";
import PropTypes from "prop-types";
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
        className={styles.noselect}
      />
    </div>
  );
};

CustomRadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(["radio", "checkbox"]),
  value: PropTypes.string,
  defaultChecked: PropTypes.bool
};

export { CustomRadioButton };

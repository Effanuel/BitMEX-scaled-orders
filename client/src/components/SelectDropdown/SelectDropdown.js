import React from "react";
import PropTypes from "prop-types";
import styles from "./SelectDropdown.module.css";

const currencies = [
  {
    value: "XBTUSD"
  },
  {
    value: "ETHUSD"
  }
];

const SelectDropdown = ({ label }) => {
  return (
    <div className={styles.selectDropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select">
        {currencies.map(item => (
          <option key={item.value} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectDropdown.propTypes = {
  label: PropTypes.string
};

export default SelectDropdown;

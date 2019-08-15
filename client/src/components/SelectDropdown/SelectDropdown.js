import React from "react";
import PropTypes from "prop-types";
import styles from "./SelectDropdown.module.css";

const SelectDropdown = ({ label, instruments, onChange, id }) => {
  //event.target.value
  return (
    <div className={styles.selectDropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select" onChange={onChange} id={id}>
        {instruments.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectDropdown.propTypes = {
  label: PropTypes.string,
  instruments: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectDropdown;

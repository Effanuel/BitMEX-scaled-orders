import React from "react";
// UTILS
import styles from "./styles.module.css";

type Props = {
  label: string;
  instruments: string[];
  onChange: (arg0: any) => void;
  id: string;
};

function SelectDropdown({ label, onChange, id, instruments }: Props) {
  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select" onChange={onChange} id={id}>
        {instruments.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SelectDropdown };

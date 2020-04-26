import React from "react";
// UTILS
import styles from "./styles.module.css";

type Props = {
  id: string;
  label: string;
  onChange: (event: any) => void;
};

function SelectDropdown({ id, label, onChange }: Props) {
  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select" onChange={onChange} id={id}>
        {["XBTUSD", "ETHUSD", "XRPUSD"].map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SelectDropdown };

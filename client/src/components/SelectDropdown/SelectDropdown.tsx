import React from 'react';

import styles from './styles.module.css';

interface Props {
  id: string;
  label: string;
  onChange: (event: any) => void;
}

function SelectDropdown({id, label, onChange}: Props) {
  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select" onChange={onChange} id={id}>
        {['XBTUSD', 'ETHUSD', 'XRPUSD'].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export {SelectDropdown};
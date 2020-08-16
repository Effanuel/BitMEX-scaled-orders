import React from 'react';
import styles from './styles.module.css';

interface Props {
  id: string;
  label: string;
  onChange: (event: any) => void;
}

const availableSymbols = ['XBTUSD', 'ETHUSD', 'XRPUSD'];

function SelectDropdown({id, label, onChange}: Props) {
  const renderSymbol = (item: string) => (
    <option key={item} value={item}>
      {item}
    </option>
  );

  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select className="custom-select" onChange={onChange} id={id}>
        {availableSymbols.map(renderSymbol)}
      </select>
    </div>
  );
}

export {SelectDropdown};

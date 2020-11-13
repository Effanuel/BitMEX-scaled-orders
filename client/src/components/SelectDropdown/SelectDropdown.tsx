import React from 'react';
import styles from './styles.module.scss';
import {COMPONENTS} from 'data-test-ids';

export interface SelectDropDownProps {
  id: string;
  label: string;
  onChange: (event: any) => void;
  disabled?: boolean;
}

const availableSymbols = ['XBTUSD', 'ETHUSD', 'XRPUSD'];

function SelectDropdown({id, label, onChange, disabled = false}: SelectDropDownProps) {
  const renderSymbol = React.useCallback((item: string) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  }, []);

  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select
        id={id}
        data-test-id={COMPONENTS.SELECT_DROPDOWN}
        disabled={disabled}
        className="custom-select"
        onChange={onChange}
      >
        {availableSymbols.map(renderSymbol)}
      </select>
    </div>
  );
}

export {SelectDropdown};

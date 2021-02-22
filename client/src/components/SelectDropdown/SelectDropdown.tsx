import React from 'react';
import styles from './styles.module.scss';
import {COMPONENTS} from 'data-test-ids';
import {SYMBOL} from 'redux/api/bitmex/types';

interface Props {
  id: string;
  label: string;
  onChange: (symbol: SYMBOL) => void;
  disabled?: boolean;
}

const availableSymbols = ['XBTUSD', 'ETHUSD', 'XRPUSD'];

export function SelectDropdown({id, label, onChange, disabled = false}: Props) {
  const onChangeSymbol = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value as SYMBOL),
    [onChange],
  );
  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>
      <select
        id={id}
        data-testid={COMPONENTS.SELECT_DROPDOWN}
        disabled={disabled}
        className="custom-select"
        onChange={onChangeSymbol}
      >
        {availableSymbols.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

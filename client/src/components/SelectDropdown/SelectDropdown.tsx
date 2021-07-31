import React from 'react';
import styles from './styles.module.scss';
import {COMPONENTS} from 'data-test-ids';
import {SYMBOL} from 'redux/api/bitmex/types';

const availableSymbols = ['XBTUSD', 'ETHUSD', 'XRPUSD'];

interface Props {
  id: string;
  label: string;
  onChange: (symbol: SYMBOL) => void;
  disabled?: boolean;
}

export function SelectDropdown({id, label, onChange, disabled = false}: Props) {
  const onChangeSymbol = React.useCallback(
    ({target}: React.ChangeEvent<HTMLSelectElement>) => onChange(target.value as SYMBOL),
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

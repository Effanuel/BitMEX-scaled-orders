import * as React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import './InputField.module.css';

type Props<T extends object> = {
  id: string;
  label: string;
  value: any;
  onChange: any;
};

const InputField = <T extends object>(props: Props<T>) => {
  const { label, id, value, onChange } = props;
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <InputGroup>
        <FormControl
          // pattern="[0-9]*"
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
    </div>
  );
};

export { InputField };

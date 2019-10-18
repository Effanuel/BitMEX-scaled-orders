import * as React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import './InputField.module.css';

interface Props {
  id: string;
  label: string;
  value: any;
  onChange: any;
}

const InputField: React.FunctionComponent<Props> = ({
  label,
  id,
  value,
  onChange
}) => {
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

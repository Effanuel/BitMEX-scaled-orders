import * as React from 'react';
import { FormCheck } from 'react-bootstrap';

const styles = require('./CustomRadioButton.css');

interface Props {
  label: string;
  type: any;
  name: string;
  defaultChecked?: any;
}

const CustomRadioButton: React.FunctionComponent<Props> = ({
  label,
  type,
  name,
  defaultChecked
}) => {
  return (
    <div className={styles.myLabel}>
      <FormCheck
        custom
        name={name}
        label={label}
        type={type}
        id={label}
        value={label}
        defaultChecked={defaultChecked}
        className={styles.noselect}
      />
    </div>
  );
};

export { CustomRadioButton };

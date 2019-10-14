import * as React from 'react';
const styles = require('./SelectDropdown.module.css');

interface Props {
  label: any;
  instruments: any;
  onChange: any;
  id: any;
}

const SelectDropdown: React.FunctionComponent<Props> = ({
  label,
  instruments,
  onChange,
  id
}) => {
  return (
    <div className={styles.selectDropdown}>
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
};

export { SelectDropdown };

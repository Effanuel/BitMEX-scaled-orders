import React from 'react';
// STYLES
import cx from 'classnames';
import styles from './styles.module.css';

export interface ButtonProps {
  id?: string;
  label: string;
  testID?: string;
  variant?: 'submit' | 'text' | 'custom';
  disabled?: boolean;
  onClick: (event: any) => void;
  style?: any;
  className?: any;
}

function Button({ id, label, testID, variant = 'submit', disabled, onClick, style, className = '' }: ButtonProps) {
  const buttonStyle = cx({
    [styles.button]: variant === 'submit',
    [styles.text_button]: variant === 'text',
    [className]: variant === 'custom',
  });
  return (
    <button id={id} data-test-id={testID} className={buttonStyle} style={style} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export { Button };

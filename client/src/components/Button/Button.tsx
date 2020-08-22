import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

export type ButtonVariants = 'submit' | 'text' | 'buy' | 'sell' | 'custom' | 'textSell';

export interface ButtonProps {
  testID?: string;
  id?: string;
  label: string;
  variant?: ButtonVariants;
  disabled?: boolean;
  onClick: (event: MouseChange) => void;
  style?: React.CSSProperties;
  className?: string;
}

function Button({id, label, testID, variant = 'submit', disabled, onClick, style, className = ''}: ButtonProps) {
  const buttonStyle = cx({
    [styles.button]: variant === 'submit',
    [styles.text_button]: variant === 'text',
    [styles.text_sell]: variant === 'textSell',
    [styles.button_buy]: variant === 'buy',
    [styles.button_sell]: variant === 'sell',
    [className]: variant === 'custom',
  });

  return (
    <button id={id} data-test-id={testID} className={buttonStyle} style={style} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export {Button};

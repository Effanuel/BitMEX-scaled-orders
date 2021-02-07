import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import {SIDE} from 'redux/api/bitmex/types';
import {CircularProgress, makeStyles} from '@material-ui/core';
import {COMPONENTS} from 'data-test-ids';

const useStyles = makeStyles(() => ({
  spinner: {padding: 0, color: 'grey', justifyContent: 'center', verticalAlign: 'middle'},
}));

export type ButtonVariants = 'submit' | 'text' | 'custom' | 'textSell' | SIDE;

export interface ButtonProps {
  testID?: string;
  id?: string;
  isLoading?: boolean;
  label: string;
  variant?: ButtonVariants;
  disabled?: boolean;
  onClick: (event: MouseChange) => void;
  style?: React.CSSProperties;
  className?: string;
}

function Button({
  id,
  label,
  isLoading,
  testID,
  variant = 'submit',
  disabled,
  onClick,
  style,
  className = '',
}: ButtonProps) {
  const classes = useStyles();
  const buttonStyle = cx({
    [styles.button]: variant === 'submit',
    [styles.text_button]: variant === 'text',
    [styles.text_sell]: variant === 'textSell',
    [styles.button_buy]: variant === 'Buy',
    [styles.button_sell]: variant === 'Sell',
    [className]: variant === 'custom',
  });

  return (
    <button id={id} data-testid={testID} className={buttonStyle} style={style} disabled={disabled} onClick={onClick}>
      {isLoading ? <CircularProgress data-testid={COMPONENTS.SPINNER} size={18} className={classes.spinner} /> : label}
    </button>
  );
}

export {Button};

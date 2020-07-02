import React from 'react';
import {Radio, FormControlLabel} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControlLabel-label': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      margin: '0px',
    },
    '& .MuiIconButton-root': {
      color: '#4caf50',
      padding: '2px',
    },
    margin: '0px',
  },
}));

interface Props {
  checked?: boolean;
  id: string;
  value: string;
  label: any;
  labelPlacement?: any;
}

function CustomRadioButton({checked, id, value, label, labelPlacement = 'end'}: Props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      checked={checked}
      id={id}
      value={value}
      className={classes.root}
      label={label}
      labelPlacement={labelPlacement}
      control={<Radio size="small" />}
    />
  );
}
export {CustomRadioButton};

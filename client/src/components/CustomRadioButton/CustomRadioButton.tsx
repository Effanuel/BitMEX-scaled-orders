import React from 'react';
import {Radio, FormControlLabel, RadioGroup} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SIDE} from 'util/BitMEX-types';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControlLabel-label': {color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: '0px'},
    '& .MuiIconButton-root': {color: '#4caf50', padding: '2px'},
    margin: '0px',
  },
}));

interface CustomRadioButtonProps {
  checked?: boolean;
  id: string;
  value: string;
  label: any;
  labelPlacement?: any;
}

export function CustomRadioButton({checked, id, value, label, labelPlacement = 'end'}: CustomRadioButtonProps) {
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

interface SideRadioButtonsProps {
  onChangeRadio: (event: any) => void;
  side: SIDE;
}

export function SideRadioButtons({onChangeRadio, side}: SideRadioButtonsProps) {
  return (
    <RadioGroup aria-label="position" name="side" value={side} onChange={onChangeRadio} style={{marginTop: '15px'}}>
      <CustomRadioButton id="scaled_side_sell" label="Sell" value="Sell" />
      <CustomRadioButton id="scaled_side_buy" label="Buy" value="Buy" />
    </RadioGroup>
  );
}

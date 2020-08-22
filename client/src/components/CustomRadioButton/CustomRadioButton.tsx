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
  id: string;
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export function CustomRadioButton(props: CustomRadioButtonProps) {
  const {root} = useStyles();
  const controlButton = React.useMemo(() => <Radio size="small" />, []);

  return <FormControlLabel labelPlacement={'end'} className={root} control={controlButton} {...props} />;
}

interface SideRadioButtonsProps {
  onChangeRadio: (event: InputChange, value: string) => void;
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

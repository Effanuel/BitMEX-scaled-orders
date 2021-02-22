import React from 'react';
import {Radio, FormControlLabel, RadioGroup} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SIDE} from 'redux/api/bitmex/types';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControlLabel-label': {color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: '0px'},
    '& .MuiIconButton-root': {color: '#4caf50', padding: '2px'},
    margin: '0px',
  },
  radioGroup: {
    marginTop: '15px',
  },
}));

interface CustomRadioButtonProps {
  id: string;
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const controlButton = <Radio size="small" />;

export function CustomRadioButton(props: CustomRadioButtonProps) {
  const {root} = useStyles();

  return <FormControlLabel labelPlacement={'end'} className={root} control={controlButton} {...props} />;
}

interface SideRadioButtonsProps {
  testID?: string;
  onChangeRadio: (value: SIDE) => void;
  side: SIDE;
}

export function SideRadioButtons({onChangeRadio, side, testID}: SideRadioButtonsProps) {
  const {radioGroup} = useStyles();
  const emitRadioChange = React.useCallback((_, value: string) => onChangeRadio(value as SIDE), [onChangeRadio]);
  return (
    <RadioGroup
      data-test-id={testID}
      aria-label="position"
      name="side"
      value={side}
      onChange={emitRadioChange}
      className={radioGroup}
    >
      <CustomRadioButton id="scaled_side_sell" label="Sell" value="Sell" />
      <CustomRadioButton id="scaled_side_buy" label="Buy" value="Buy" />
    </RadioGroup>
  );
}

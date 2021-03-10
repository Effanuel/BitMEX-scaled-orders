import React from 'react';
import {Radio, RadioGroup} from '@chakra-ui/react';
import {SIDE} from 'redux/api/bitmex/types';

interface CustomRadioButtonProps {
  value: string;
  label: string;
}

export function CustomRadioButton({label, value}: CustomRadioButtonProps) {
  return (
    <Radio value={value} size="md" colorScheme="green" margin={0}>
      {label}
    </Radio>
  );
}

interface SideRadioButtonsProps {
  testID?: string;
  onChangeRadio: (value: SIDE) => void;
  side: SIDE;
}

export function SideRadioButtons({onChangeRadio, side, testID}: SideRadioButtonsProps) {
  return (
    <RadioGroup display="flex" flexDir="column" data-testid={testID} name="side" onChange={onChangeRadio} value={side}>
      <CustomRadioButton label="Sell" value={SIDE.SELL} />
      <CustomRadioButton label="Buy" value={SIDE.BUY} />
    </RadioGroup>
  );
}

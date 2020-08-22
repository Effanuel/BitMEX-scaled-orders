import React from 'react';
import {RadioGroup} from '@material-ui/core';
import {CustomRadioButton} from 'components';
import {DISTRIBUTIONS} from 'util/index';

interface Props {
  onChange: (e: any) => void;
  distribution: DISTRIBUTIONS;
}

const availableDistributions = ['Uniform', 'Normal', 'Positive', 'Negative'];

export default function DistributionsRadioGroup({onChange, distribution}: Props) {
  return (
    <RadioGroup aria-label="Distribution" name="distribution" value={distribution} onChange={onChange} row>
      {availableDistributions.map((item) => (
        <CustomRadioButton id={`scaled_distr_${item.toLowerCase()}`} key={item} label={<>{item}</>} value={item} />
      ))}
    </RadioGroup>
  );
}

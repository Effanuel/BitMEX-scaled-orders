import React from 'react';
import {RadioGroup} from '@chakra-ui/react';
import {CustomRadioButton} from 'components';
import {DISTRIBUTION} from 'utils';

interface Props {
  onChange: (value: string) => void;
  distribution: DISTRIBUTION;
}

const availableDistributions = ['Uniform', 'Normal', 'Positive', 'Negative'];

export default function DistributionsRadioGroup({onChange, distribution}: Props) {
  return (
    <RadioGroup
      flex="display"
      flexDir="row"
      aria-label="Distribution"
      name="distribution"
      value={distribution}
      onChange={onChange}
    >
      {availableDistributions.map((item) => (
        <CustomRadioButton key={item} label={item} value={item} />
      ))}
    </RadioGroup>
  );
}

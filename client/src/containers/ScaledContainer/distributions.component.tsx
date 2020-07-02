import React from 'react';
import {RadioGroup} from '@material-ui/core';

import {CustomRadioButton} from 'components';
import {DISTRIBUTIONS} from 'util/index';

interface Props {
  onChange: (e: any) => void;
  distribution: DISTRIBUTIONS;
}

export default function DistributionsContainer({onChange, distribution}: Props) {
  return (
    <div>
      <RadioGroup aria-label="Distribution" name="distribution" value={distribution} onChange={onChange} row>
        {['Uniform', 'Normal', 'Positive', 'Negative'].map((item) => (
          <CustomRadioButton id={`scaled_distr_${item.toLowerCase()}`} key={item} label={<>{item}</>} value={item} />
        ))}
      </RadioGroup>
    </div>
  );
}

import React from 'react';
import { CustomRadioButton } from 'components';

import { RadioGroup } from '@material-ui/core';
// import ICONS from 'components/SVGIcon/icons';
import { DISTRIBUTIONS } from 'util/index';

interface Props {
  onChange: (e: any) => void;
  distribution: DISTRIBUTIONS;
}

function DistributionsContainer({ onChange, distribution }: Props) {
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

export default DistributionsContainer;

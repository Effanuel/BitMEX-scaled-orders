import React from 'react';
import {Box, NumberInput, NumberInputField} from '@chakra-ui/react';
import './InputField.module.scss';

interface Props {
  testID?: string;
  id?: string;
  label?: string;
  value: string;
  stop?: boolean;
  placeholder?: string;
  t_placement?: string;
  tooltip?: string;
  onChange: (value: string, id: string) => void;
}

export function InputField(props: Props) {
  const {id, label, value, stop = false, placeholder, onChange, testID} = props;

  const invokeValueChange = React.useCallback((value: string) => onChange(value, id as string), [onChange, id]);

  return (
    <Box>
      <Box color="rgba(255, 255, 255, 0.6)" fontSize="14px" paddingBottom={1}>
        {label}
      </Box>
      <NumberInput max={20e6} size="sm" placeholder={placeholder} onChange={invokeValueChange} value={value || ''}>
        <NumberInputField
          data-testid={testID}
          id={id}
          fontSize={16}
          padding="5px"
          borderRadius={2}
          borderColor={stop ? 'red' : 'rgba(255, 255, 255, 0.6)'}
          backgroundColor="#121212"
          color="rgba(255, 255, 255, 0.87)"
          height="30px"
          _hover={{borderColor: 'rgba(255, 255, 255, 0.6)'}}
          _focus={{borderColor: stop ? 'red' : 'green'}}
        />
      </NumberInput>
    </Box>
  );
}

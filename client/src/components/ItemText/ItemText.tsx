import React from 'react';
import {Text, Box, ThemingProps} from '@chakra-ui/react';

interface Props extends ThemingProps {
  primary: string | number;
  secondary: string | number;
}

export default function ItemText({primary, secondary}: Props) {
  return (
    <Box display="flex" style={{flexDirection: 'column', justifyContent: 'flex-start'}} paddingRight="6px">
      <Text color="grey" textStyle="bold">
        {primary}
      </Text>
      <Text display="flex" color="white" textStyle="bold">
        {secondary}
      </Text>
    </Box>
  );
}

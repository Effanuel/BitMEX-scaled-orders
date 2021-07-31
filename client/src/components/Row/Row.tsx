import React from 'react';
import {Grid} from '@chakra-ui/react';

interface Props {
  padding?: number;
  children: React.ReactNode;
  alignItems?: string;
}

export function Row({children, padding = 3, alignItems = 'flex-end'}: Props) {
  return (
    <Grid display="flex" w="100%" justifyContent="space-between" padding={padding} gap={4} alignItems={alignItems}>
      {children}
    </Grid>
  );
}

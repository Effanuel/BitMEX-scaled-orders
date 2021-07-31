import React from 'react';
import {Box, Progress} from '@chakra-ui/react';

interface Props {
  loading: boolean;
}

export function Spinner({loading}: Props) {
  return (
    <>
      {loading ? (
        <Progress maxWidth="720px" size="xs" colorScheme="green" isIndeterminate margin="auto" height="5px" />
      ) : (
        <Box height="5px" />
      )}
    </>
  );
}

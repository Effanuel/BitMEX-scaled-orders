import React from 'react';
import {Td, Table as ChakraTable, Tr, Tbody, Th, Thead} from '@chakra-ui/react';

export function Table() {
  return (
    <ChakraTable>
      <Thead textColor="green.300">
        <Tr textColor="white">
          <Th color="white">Symbol</Th>
          <Th>Type</Th>
          <Th isNumeric>Order Amount</Th>
          <Th isNumeric>Price</Th>
          <Th>Date</Th>
          <Th>Cancel All</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr borderLeftWidth={3} borderLeftColor="red">
          <Td>XBTUSD</Td>
          <Td>BUY</Td>
          <Td isNumeric>500</Td>
          <Td isNumeric>70000</Td>
          <Td>{new Date().toLocaleString()}</Td>
          <Td color="red" textStyle="hover">
            CANCEL
          </Td>
        </Tr>
        <Tr>
          <Td>XBTUSD</Td>
          <Td>BUY</Td>
          <Td isNumeric>500</Td>
          <Td isNumeric>70000</Td>
          <Td>{new Date().toLocaleString()}</Td>
          <Td>CANCEL</Td>
        </Tr>
      </Tbody>
    </ChakraTable>
  );
}

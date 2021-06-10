import React from 'react';
import {Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {Order, ORD_TYPE} from 'redux/api/bitmex/types';
import {ScaledOrder} from 'utils';
import {presentOrderType} from 'presenters/order-presenters';
import {presentOrderPrice} from 'containers/OpenOrders/OpenOrdersContainer';
import {SCALED_CONTAINER} from 'data-test-ids';

interface Props {
  orders?: ScaledOrder[];
}

export default function OrdersTable({orders}: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Symbol</Th>
          <Th>Type</Th>
          <Th isNumeric>Quantity</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders &&
          //@ts-ignore
          orders.map(({symbol, side, orderQty, price, stopPx}, index) => {
            const color = side === 'Sell' ? 'red' : 'green';
            const ordType = !!stopPx ? ORD_TYPE.Stop : ORD_TYPE.Limit;
            return (
              <Tr data-testid={SCALED_CONTAINER.ORDER_ROW} key={index} borderLeftWidth={2} borderLeftColor={color}>
                <Td>{symbol}</Td>
                <Td color={color}>{presentOrderType({side, ordType} as Order)}</Td>
                <Td isNumeric>{orderQty}</Td>
                <Td isNumeric>{presentOrderPrice({price, stopPx, ordType} as Order)}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
}

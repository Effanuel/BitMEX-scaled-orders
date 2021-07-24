import {Td, Tr} from '@chakra-ui/react';
import {OPEN_ORDERS_CONTAINER} from 'data-test-ids';
import {formatPrice} from 'general/formatting';
import {useModal} from 'general/hooks';
import React from 'react';
import {Order} from 'redux/api/bitmex/types';

interface Props {
  order: Order;
}

function ProfitOrderInActionRow({order}: Props) {
  const {orderQty, side, symbol, orderID, timestamp, price} = order;

  const {modals} = useModal();

  const showCancelProfitOrderModal = React.useCallback(
    () => modals.showCancelProfitOrder({orderID, symbol, quantity: orderQty, price}),
    [modals, orderID, symbol, orderQty, price],
  );

  const color = side === 'Sell' ? 'red' : 'green';

  return (
    <Tr
      key={orderID}
      data-testid={OPEN_ORDERS_CONTAINER.PROFIT_ORDER_IN_ACTION}
      borderLeftWidth={2}
      borderLeftColor={color}
    >
      <Td>{symbol}</Td>
      <Td whiteSpace="pre" color={color}>
        Profit Order In Action
      </Td>
      <Td isNumeric>{orderQty}</Td>
      <Td isNumeric>{formatPrice(price, order.symbol)}</Td>
      <Td whiteSpace="pre">{new Date(timestamp).toISOString().split('T')[0]}</Td>
      <Td>PROFIT</Td>
      <Td
        data-testid={`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID}`}
        color="red"
        textStyle="hover:red:color"
        onClick={showCancelProfitOrderModal}
      >
        CANCEL
      </Td>
    </Tr>
  );
}

export default ProfitOrderInActionRow;

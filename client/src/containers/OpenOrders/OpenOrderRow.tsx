import React from 'react';
import {Td, Tr} from '@chakra-ui/react';
import {OPEN_ORDERS_CONTAINER} from 'data-test-ids';
import {Order} from 'redux/api/bitmex/types';
import {presentOrderType} from 'presenters/order-presenters';
import {presentOrderPrice} from 'containers/OpenOrders/OpenOrdersContainer';
import ProfitOrders from 'containers/OpenOrders/ProfitOrders';
import {useModal} from 'general/hooks';

interface Props {
  order: Order;
  profitOrders: Order[];
}

export default function OpenOrderRow({order, profitOrders}: Props) {
  const {orderQty, side, symbol, orderID, timestamp} = order;

  const {modals} = useModal();

  const color = side === 'Sell' ? 'red' : 'green';

  const showAddProfitTargetModal = React.useCallback(() => modals.showAddProfitTarget({orderID}), [modals, orderID]);
  const showCancelOrderModal = React.useCallback(() => modals.showCancelOrder({orderID}), [modals, orderID]);

  return (
    <Tr key={orderID} data-testid={OPEN_ORDERS_CONTAINER.ORDER_ROW} borderLeftWidth={2} borderLeftColor={color}>
      <Td>{symbol}</Td>
      <Td whiteSpace="pre" color={color}>
        {presentOrderType(order)}
      </Td>
      <Td isNumeric>{orderQty}</Td>
      <Td isNumeric>{presentOrderPrice(order)}</Td>
      <Td whiteSpace="pre">{new Date(timestamp).toISOString().split('T')[0]}</Td>
      {profitOrders?.length ? (
        <Td>
          <ProfitOrders orderID={orderID} orders={profitOrders} quantityToCover={orderQty} />
        </Td>
      ) : (
        <Td
          data-testid={OPEN_ORDERS_CONTAINER.ADD_PROFIT}
          textStyle="hover:green:color"
          onClick={showAddProfitTargetModal}
        >
          +Add
        </Td>
      )}
      <Td
        data-testid={`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID}`}
        color="red"
        textStyle="hover:red:color"
        onClick={showCancelOrderModal}
      >
        CANCEL
      </Td>
    </Tr>
  );
}

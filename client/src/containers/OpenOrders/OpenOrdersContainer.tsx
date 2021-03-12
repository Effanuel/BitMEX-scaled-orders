import React from 'react';
import {Tbody, Td, Th, Thead, Tr, Table, Box} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {formatPrice} from 'general/formatting';
import {Order, ORD_TYPE} from 'redux/api/bitmex/types';
import {MainContainer} from 'components';
import {getOpenOrders} from 'redux/modules/orders/ordersModule';
import {presentOrderType} from 'presenters/order-presenters';
import {useModal} from 'general/hooks';
import ProfitOrders from './ProfitOrders';
import {OPEN_ORDERS_CONTAINER} from 'data-test-ids';

function Text({children}: {children: React.ReactNode}) {
  return (
    <Box
      data-testid={OPEN_ORDERS_CONTAINER.EMPTY_CTA}
      display="flex"
      w="100%"
      color="white"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
}

export const presentOrderPrice = (order: Order) => {
  switch (order.ordType) {
    case ORD_TYPE.Limit:
      return formatPrice(order.price);
    case ORD_TYPE.LimitIfTouched:
    case ORD_TYPE.StopLimit:
      return (
        <>
          <Box fontSize={12}>WHEN {formatPrice(order.stopPx)}</Box>
          <Box fontSize={12}>WHAT {formatPrice(order.price)}</Box>
        </>
      );
    case ORD_TYPE.Stop:
    case ORD_TYPE.MarketIfTouched:
      return formatPrice(order.stopPx);
    default:
      return null;
  }
};

export default function OpenOrdersContainer() {
  const dispatch = useDispatch();
  const {modals} = useModal();

  const {openOrders, profitOrders, profitOrdersInAction, groupedOrders, ordersLoading, ordersError} = useReduxSelector(
    'openOrders',
    'profitOrders',
    'profitOrdersInAction',
    'groupedOrders',
    'ordersLoading',
    'ordersError',
  );

  React.useEffect(() => {
    dispatch(getOpenOrders(undefined));
  }, [dispatch]);

  const showCancelOrderModal = React.useCallback(
    (orderID: string) => () => modals.showCancelOrder({orderID}), /// Prettier
    [modals],
  );

  const showAddProfitTargetModal = React.useCallback(
    (orderID: string) => () => modals.showAddProfitTarget({orderID}), /// Prettier
    [modals],
  );

  const showCancelAllOrdersModal = React.useCallback(() => {
    const totalOrders = openOrders.length + profitOrders.length + profitOrdersInAction.length;
    modals.showCancelAllOrders({totalOrders});
  }, [modals, openOrders.length, profitOrders.length, profitOrdersInAction.length]);

  const showCancelProfitOrderModal = React.useCallback(
    (modalProps: any) => () => modals.showCancelProfitOrder(modalProps),
    [modals],
  );

  const secondaryState = React.useMemo(() => {
    const text =
      ordersError !== ''
        ? `Failed to fetch open orders: ${ordersError}`
        : ordersLoading
        ? 'Loading...'
        : openOrders.length === 0 && profitOrdersInAction.length === 0
        ? 'No Open Orders'
        : undefined;

    return text ? <Text>{text}</Text> : undefined;
  }, [ordersError, ordersLoading, openOrders, profitOrdersInAction]);

  return (
    <MainContainer label="Open orders" description="Shows current open orders" secondaryState={secondaryState}>
      <Table>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Type</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Price</Th>
            <Th>Date</Th>
            <Th w={1 / 2}>Profit Target</Th>
            <Th
              data-testid={OPEN_ORDERS_CONTAINER.CANCEL_ALL}
              bg="#424242"
              textStyle="hover:red:border"
              onClick={showCancelAllOrdersModal}
            >
              Cancel All
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {openOrders.map((order) => {
            const {orderQty, side, symbol, orderID, timestamp} = order;
            const color = side === 'Sell' ? 'red' : 'green';

            const profitOrders = groupedOrders?.[orderID] ?? [];
            return (
              <Tr
                key={orderID}
                data-testid={OPEN_ORDERS_CONTAINER.ORDER_ROW}
                borderLeftWidth={2}
                borderLeftColor={color}
              >
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
                    onClick={showAddProfitTargetModal(orderID)}
                  >
                    +Add
                  </Td>
                )}
                <Td
                  data-testid={`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID}`}
                  color="red"
                  textStyle="hover:red:color"
                  onClick={showCancelOrderModal(orderID)}
                >
                  CANCEL
                </Td>
              </Tr>
            );
          })}
          {profitOrdersInAction.map((order) => {
            const {orderQty, side, symbol, orderID, timestamp, price} = order;
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
                <Td isNumeric>{formatPrice(price)}</Td>
                <Td whiteSpace="pre">{new Date(timestamp).toISOString().split('T')[0]}</Td>
                <Td>PROFIT</Td>
                <Td
                  data-testid={`${OPEN_ORDERS_CONTAINER.CANCEL}.${orderID}`}
                  color="red"
                  textStyle="hover:red:color"
                  onClick={showCancelProfitOrderModal({orderID, side, symbol, quantity: orderQty, price})}
                >
                  CANCEL
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </MainContainer>
  );
}

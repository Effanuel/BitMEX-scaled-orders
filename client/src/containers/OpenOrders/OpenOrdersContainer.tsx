import React from 'react';
import {Tbody, Th, Thead, Tr, Table, Box} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {formatPrice} from 'general/formatting';
import {Order, ORD_TYPE} from 'redux/api/bitmex/types';
import {MainContainer} from 'components';
import {getOpenOrders} from 'redux/modules/orders/ordersModule';
import {useModal} from 'general/hooks';
import {OPEN_ORDERS_CONTAINER} from 'data-test-ids';
import OpenOrderRow from './OpenOrderRow';
import ProfitOrderInActionRow from './ProfitOrderInActionRow';

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
    dispatch(getOpenOrders());
  }, [dispatch]);

  const showCancelAllOrdersModal = React.useCallback(() => {
    const totalOrders = openOrders.length + profitOrders.length + profitOrdersInAction.length;
    modals.showCancelAllOrders({totalOrders});
  }, [modals, openOrders.length, profitOrders.length, profitOrdersInAction.length]);

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
          {openOrders.map((order) => (
            <OpenOrderRow key={order.orderID} order={order} profitOrders={groupedOrders?.[order.orderID] ?? []} />
          ))}
          {profitOrdersInAction.map((order) => (
            <ProfitOrderInActionRow key={order.orderID} order={order} />
          ))}
        </Tbody>
      </Table>
    </MainContainer>
  );
}

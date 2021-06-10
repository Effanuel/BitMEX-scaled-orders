import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Modal} from 'components';
import {cancelOrder} from 'redux/modules/orders/ordersModule';
import {AppState} from 'redux/models/state';
import {groupedOrdersSelector, orderSelector} from 'redux/selectors';

interface Props {
  orderID: string;
}

export function CancelOrderModal({orderID}: Props) {
  const dispatch = useDispatch();

  const {order, groupedOrders} = useSelector(
    (state: AppState) => ({
      order: orderSelector(state, {orderID}),
      groupedOrders: groupedOrdersSelector(state),
    }),
    shallowEqual,
  );

  const profitOrderIDs = React.useMemo(() => {
    return (groupedOrders?.[orderID] ?? []).map(({orderID}) => orderID);
  }, [groupedOrders, orderID]);

  const emitConfirm = React.useCallback(() => {
    if (order) {
      dispatch(cancelOrder({orderID: [order.orderID, ...profitOrderIDs]}));
    }
  }, [dispatch, profitOrderIDs, order]);

  if (!order) {
    return null;
  }

  return (
    <Modal title="Cancel Order" onConfirm={emitConfirm}>
      {`Cancel ${order.symbol} order with price $${order.price} and quantity ${order.orderQty}`}
      {profitOrderIDs.length ? `, with ${profitOrderIDs.length} profit orders` : '.'}
    </Modal>
  );
}

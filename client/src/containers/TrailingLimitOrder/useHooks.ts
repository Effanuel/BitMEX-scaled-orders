import {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {AppState} from 'redux/models/state';
import {
  trailingOrderStatusSelector,
  websocketBidAskPrices,
  websocketCurrentPrice,
  websocketTrailingPriceSelector,
} from 'redux/selectors';
import {ammendTrailingOrder, __clearTrailingOrder} from 'redux/modules/trailing/trailingModule';

export function useHooks() {
  const {
    wsTrailingPrice,
    wsCurrentPrice,
    wsBidAskPrices,
    trailOrderId,
    trailOrderStatus,
    trailOrderPrice,
    trailOrderSide,
    status,
    connected,
  } = useSelector((state: AppState) => {
    const {websocket, trailing} = state;
    return {
      wsCurrentPrice: websocketCurrentPrice(state),
      wsTrailingPrice: websocketTrailingPriceSelector(state),
      wsBidAskPrices: websocketBidAskPrices(state),
      status: trailingOrderStatusSelector(state),
      connected: websocket.connected,
      trailOrderId: trailing.trailOrderId,
      trailOrderPrice: trailing.trailOrderPrice,
      trailOrderStatus: trailing.trailOrderStatus,
      trailOrderSide: trailing.trailOrderSide,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    const statuses = ['Filled', 'Canceled', 'Order not placed.'];
    if (wsTrailingPrice && trailOrderPrice && !statuses.includes(status)) {
      const toAmmend = wsTrailingPrice !== trailOrderPrice;
      if (toAmmend) {
        dispatch(ammendTrailingOrder({orderID: trailOrderId, price: wsTrailingPrice}));
      }
    }
  }, [dispatch, trailOrderPrice, trailOrderId, trailOrderSide, status, wsTrailingPrice]);

  useEffect(() => {
    const statuses = ['Filled', 'Canceled', 'Order not placed.'];
    if (statuses.includes(status) && trailOrderStatus !== 'Order not placed.') {
      dispatch(__clearTrailingOrder());
    }
  }, [dispatch, trailOrderStatus, status]);

  return {
    wsCurrentPrice,
    wsBidAskPrices,
    trailOrderId,
    trailOrderStatus,
    trailOrderPrice,
    status,
    connected,
  };
}

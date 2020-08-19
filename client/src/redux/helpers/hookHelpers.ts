import {useSelector, shallowEqual} from 'react-redux';
import {
  ordersAverageEntrySelector,
  ordersRiskSelector,
  ordersRiskPercSelector,
  websocketCurrentPrice,
  trailingOrderStatusSelector,
  websocketBidAskPrices,
  allWebsocketBidAskPrices,
} from 'redux/selectors';
import {TrailingState} from 'redux/modules/trailing/types';
import {PreviewState} from 'redux/modules/preview/types';
import {WebsocketState} from 'redux/modules/websocket/types';
import {AppState} from 'redux/store';

type States = TrailingState & PreviewState & WebsocketState;

interface Selectors extends States {
  wsCurrentPrice: ReturnType<typeof websocketCurrentPrice>;
  wsBidAskPrices: ReturnType<typeof websocketBidAskPrices>;
  allPrices: ReturnType<typeof allWebsocketBidAskPrices>;
  averagePrice: ReturnType<typeof ordersAverageEntrySelector>;
  riskBTC: ReturnType<typeof ordersRiskSelector>;
  riskPerc: ReturnType<typeof ordersRiskPercSelector>;
  status: ReturnType<typeof trailingOrderStatusSelector>;
  wsLoading: boolean;
  wsMessage: any;
}

const buildSelectors = (state: AppState): Selectors => {
  const {trailing, preview, websocket} = state;
  return {
    wsCurrentPrice: websocketCurrentPrice(state),
    wsBidAskPrices: websocketBidAskPrices(state),
    allPrices: allWebsocketBidAskPrices(state),
    averagePrice: ordersAverageEntrySelector(state),
    riskBTC: ordersRiskSelector(state),
    riskPerc: ordersRiskPercSelector(state),
    status: trailingOrderStatusSelector(state),

    trailOrderId: trailing.trailOrderId,
    trailOrderPrice: trailing.trailOrderPrice,
    trailOrderStatus: trailing.trailOrderStatus,
    trailOrderSide: trailing.trailOrderSide,
    trailOrderSymbol: trailing.trailOrderSymbol,
    trailLoading: trailing.trailLoading,

    orders: preview.orders,
    balance: preview.balance,
    error: preview.error,
    showPreview: preview.showPreview,
    previewLoading: preview.previewLoading,

    __keys: websocket.__keys,
    connected: websocket.connected,
    instrument: websocket.instrument,
    order: websocket.order,
    wsLoading: websocket.wsLoading,
    wsMessage: websocket.message,
  };
};

export function useReduxSelector<K extends keyof Selectors>(...keys: K[]): Pick<Selectors, K> {
  const selector = useSelector((state: AppState) => {
    const builtSelectors = buildSelectors(state);
    return keys.reduce(
      (availableSelectors: any, selectorKey: keyof Selectors) => (
        (availableSelectors[selectorKey] = builtSelectors[selectorKey]), availableSelectors
      ),
      {},
    );
  }, shallowEqual);
  return selector;
}

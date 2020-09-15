import {useSelector, shallowEqual} from 'react-redux';
import {
  ordersAverageEntrySelector,
  ordersRiskSelector,
  ordersRiskPercSelector,
  websocketCurrentPrice,
  trailingOrderStatusSelector,
  websocketBidAskPrices,
  allWebsocketBidAskPrices,
  websocketTrailingPriceSelector,
} from 'redux/selectors';
import {AppState} from 'redux/models/state';

type States = UnionToIntersection<ValueOf<AppState>>;

interface Selectors extends States {
  wsCurrentPrice: ReturnType<typeof websocketCurrentPrice>;
  wsTrailingPrice: ReturnType<typeof websocketTrailingPriceSelector>;
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
  const {trailing, preview, websocket, cross} = state;
  return {
    wsCurrentPrice: websocketCurrentPrice(state),
    wsTrailingPrice: websocketTrailingPriceSelector(state),
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

    crossOrderSymbol: cross.crossOrderSymbol,
    crossOrderQuantity: cross.crossOrderQuantity,
    crossOrderPrice: cross.crossOrderPrice,
    crossOrderSide: cross.crossOrderSide,
    hasPriceCrossedOnce: cross.hasPriceCrossedOnce,

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

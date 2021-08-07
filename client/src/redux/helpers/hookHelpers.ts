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
  websocketCrossPriceSelector,
  hasCrossedOnceSelector,
  hasCrossedSecondTimeSelector,
  groupedOrdersSelector,
} from 'redux/selectors';
import {AppState} from 'redux/modules/state';

type States = UnionToIntersection<ValueOf<AppState>>;

interface Selectors extends States {
  wsCurrentPrice: ReturnType<typeof websocketCurrentPrice>;
  wsTrailingPrice: ReturnType<typeof websocketTrailingPriceSelector>;
  wsCrossPrice: ReturnType<typeof websocketCrossPriceSelector>;
  wsBidAskPrices: ReturnType<typeof websocketBidAskPrices>;
  allPrices: ReturnType<typeof allWebsocketBidAskPrices>;
  averagePrice: ReturnType<typeof ordersAverageEntrySelector>;
  riskBTC: ReturnType<typeof ordersRiskSelector>;
  riskPerc: ReturnType<typeof ordersRiskPercSelector>;
  status: ReturnType<typeof trailingOrderStatusSelector>;
  hasCrossedOnce: ReturnType<typeof hasCrossedOnceSelector>;
  hasCrossedSecondTime: ReturnType<typeof hasCrossedSecondTimeSelector>;
  groupedOrders: ReturnType<typeof groupedOrdersSelector>;
  wsLoading: boolean;
  wsMessage: any;
}

const buildSelectors = (state: AppState): Selectors => {
  const {trailing, preview, websocket, cross, orders, settings} = state;
  return {
    wsCurrentPrice: websocketCurrentPrice(state),
    wsTrailingPrice: websocketTrailingPriceSelector(state),
    wsCrossPrice: websocketCrossPriceSelector(state),
    wsBidAskPrices: websocketBidAskPrices(state),
    allPrices: allWebsocketBidAskPrices(state),
    averagePrice: ordersAverageEntrySelector(state),
    riskBTC: ordersRiskSelector(state),
    riskPerc: ordersRiskPercSelector(state),
    status: trailingOrderStatusSelector(state),
    hasCrossedOnce: hasCrossedOnceSelector(state),
    hasCrossedSecondTime: hasCrossedSecondTimeSelector(state),
    groupedOrders: groupedOrdersSelector(state),

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

    openOrders: orders.openOrders,
    ordersError: orders.ordersError,
    ordersLoading: orders.ordersLoading,
    profitOrders: orders.profitOrders,
    profitOrdersInAction: orders.profitOrdersInAction,

    activeApiKeys: settings.activeApiKeys,
    settingsError: settings.settingsError,
    settingsLoading: settings.settingsLoading,
  };
};

export function useReduxSelector<K extends keyof Selectors>(...keys: K[]): Pick<Selectors, K> {
  const selector = useSelector((state: AppState) => {
    const builtSelectors = buildSelectors(state);
    return keys.reduce(
      (availableSelectors: Pick<Selectors, K>, selectorKey: K) => (
        (availableSelectors[selectorKey] = builtSelectors[selectorKey]), availableSelectors
      ),
      {} as Selectors,
    );
  }, shallowEqual);
  return selector;
}

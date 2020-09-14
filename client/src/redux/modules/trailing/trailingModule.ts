import {createReducer, createAction} from '@reduxjs/toolkit';
import {withPayloadType, createThunk} from 'redux/helpers/actionHelpers';
import {SIDE, ORD_TYPE, SYMBOLS} from 'util/BitMEX-types';
import {
  TrailingState,
  __CLEAR_TRAILING_ORDER,
  POST_TRAILING_ORDER,
  PUT_TRAILING_ORDER,
  DELETE_TRAILING_ORDER,
  CHANGE_TRAILING_ORDER_SYMBOL,
} from './types';

export const defaultState: TrailingState = {
  trailOrderId: '',
  trailOrderPrice: 0,
  trailOrderStatus: 'Order not placed.',
  trailOrderSide: SIDE.SELL,
  trailOrderSymbol: SYMBOLS.XBTUSD,
  trailLoading: false,
};

export const __clearTrailingOrder = createAction(__CLEAR_TRAILING_ORDER);

export const changeTrailingOrderSymbol = createAction(CHANGE_TRAILING_ORDER_SYMBOL, withPayloadType<SYMBOLS>());

export const postTrailingOrder = createThunk(POST_TRAILING_ORDER, 'postTrailingOrder'); // TODO ADD {side: props.side}

type AmmendTrailingOrderProps = {orderID: string; price: number};
export const ammendTrailingOrder = createThunk<AmmendTrailingOrderProps>(PUT_TRAILING_ORDER, 'putTrailingOrder');

export const cancelTrailingOrder = createThunk<{orderID: string}>(DELETE_TRAILING_ORDER, 'deleteTrailingOrder');

export const trailingReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(postTrailingOrder.fulfilled.type, (state, action) => postTrailingOrderReducer(state, action))
    .addCase(postTrailingOrder.rejected.type, (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order posting error.'};
    })
    .addCase(postTrailingOrder.pending.type, (state) => {
      state.trailLoading = true;
    })
    .addCase(ammendTrailingOrder.fulfilled.type, (state, {payload}: any) => {
      return {...state, trailLoading: false, trailOrderPrice: payload.price};
    })

    .addCase(ammendTrailingOrder.rejected.type, (state) => {
      return {...state, trailLoading: false, trailOrderStatus: 'Order ammending error'};
    })
    .addCase(cancelTrailingOrder.fulfilled.type, () => defaultState)
    .addCase(cancelTrailingOrder.rejected.type, () => defaultState)
    .addCase(__clearTrailingOrder, () => defaultState)
    .addCase(changeTrailingOrderSymbol, (state, {payload}) => {
      state.trailOrderSymbol = payload;
    }),
);

const postTrailingOrderReducer = (state = defaultState, action: Action): TrailingState => {
  const {text, orderID, price, success, side} = action.payload;
  const isSuccess = success === 200 && text === 'best_order';

  const response = isSuccess
    ? {trailOrderId: orderID, trailOrderStatus: 'Order placed.', trailOrderPrice: price}
    : {trailrderId: '', trailOrderStatus: 'Order cancelled.'};
  return {...state, ...response, trailLoading: false, trailOrderSide: side};
};

export interface PostTrailingOrderProps {
  symbol: SYMBOLS;
  orderQty: number;
  price: number;
  side: SIDE;
  ordType: ORD_TYPE;
  text: string;
}

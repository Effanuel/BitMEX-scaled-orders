// eslint-disable
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

import {marketOrder} from 'redux/modules/preview';
import {wsSubscribeTo, wsUnsubscribeFrom} from 'redux/modules/websocket';
import {createBestOrder, amendBestOrder, __clearBestOrder} from 'redux/modules/best-price';
import {bestOrderStatus, bestOrderStatusSelector, websocketCurrentPrice} from 'redux/selectors';

import {MainContainer, SelectDropdown, InputField, Button} from 'components';
import styles from './styles.module.css';
import {SYMBOLS, ORD_TYPE, SIDE} from 'util/BitMEX-types';
import {AppState} from 'redux/models/state';

interface State {
  symbol: SYMBOLS;
  orderQty: number;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: 50,
};

const MarketOrderContainer = React.memo(() => {
  const [state, setState] = useState(initialState);
  // REDUX
  const dispatch = useDispatch();
  const {wsCurrentPrice, status, best_order_status, best_order_price, best_order_side, best_order_id} = useSelector(
    (state: AppState) => ({
      wsCurrentPrice: websocketCurrentPrice(state),
      status: bestOrderStatus(state),
      best_order_status: bestOrderStatusSelector(state),
      best_order_price: state.best_price.price,
      best_order_side: state.best_price.side,
      best_order_id: state.best_price.bestOrderID,
      // check current open orders

      // check if connected to websocket
    }),
    shallowEqual,
  );
  // ===

  // useEffect(() => {
  //cancel order if crashed
  //   dispatch(getOrders());
  // }, [dispatch]);

  useEffect(() => {
    //Check the status of our best_order
    const statuses = ['Filled', 'Canceled', 'Order not placed.'];
    if (statuses.includes(best_order_status) && status !== 'Order not placed.') {
      // Set a timeout so we can still see a "Canceled" message.
      dispatch(wsUnsubscribeFrom('order'));
      setTimeout(async () => {
        dispatch(__clearBestOrder());
      }, 3000);
    }
  }, [dispatch, best_order_status]);

  useEffect(() => {
    console.log('current price:', wsCurrentPrice);
    if (wsCurrentPrice) {
      const toAmmend =
        best_order_side === 'Sell' ? wsCurrentPrice < best_order_price : wsCurrentPrice > best_order_price;
      if (best_order_price && toAmmend) {
        console.log('Amending order: ', wsCurrentPrice, best_order_price);
        amendBestOrder(wsCurrentPrice, best_order_id);
      }
    }
  }, [wsCurrentPrice, best_order_price]);

  useEffect(() => {
    if (status === 'Order placed.') {
      console.log('call sub to order');
      dispatch(wsSubscribeTo('order'));
    }
  }, [dispatch, status]);

  function submitBestOrder({target: {id: side}}: React.ChangeEvent<HTMLButtonElement>) {
    const payload = {
      ...state,
      price: wsCurrentPrice || 9200,
      side: side as SIDE,
      ordType: ORD_TYPE.Limit,
      text_prefix: 'best_order',
    };
    createBestOrder(payload);
  }

  function submitMarketOrder({target: {id}}: React.ChangeEvent<HTMLButtonElement>) {
    marketOrder({...state, side: id});
  }

  function onChange({target: {id, value, tagName}}: React.ChangeEvent<HTMLInputElement>): void {
    const updated = tagName === 'INPUT' ? +value : value;
    setState((prevState) => ({...prevState, [id]: updated}));
  }

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3}>
          <SelectDropdown id="symbol" onChange={onChange} label="Instrument" />
        </Grid>
        <Grid item xs={3}>
          <InputField onChange={onChange} value={state.orderQty} label="Quantity" id="orderQty" />
        </Grid>
        <Grid item xs={3} className={styles.top_row}>
          <Button
            id="Buy"
            label="MARKET Buy"
            variant="custom"
            className={styles.button_buy}
            onClick={submitMarketOrder}
            disabled={!state.orderQty || state.orderQty > 20e6}
          />
        </Grid>
        <Grid item xs={3} className={styles.top_row}>
          <Button
            id="Sell"
            label="MARKET Sell"
            variant="custom"
            className={styles.button_sell}
            onClick={submitMarketOrder}
            disabled={!state.orderQty || state.orderQty > 20e6}
          />
        </Grid>
      </>
    );
  }

  function renderSecondRow() {
    return (
      <>
        <Grid item xs={6}>
          <div style={{color: 'white'}}>
            Best order status: <span style={{color: 'green'}}>{best_order_status}</span>
          </div>
          {/* <div style={{ color: "green" }}>{status}</div> */}
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Buy"
            label="BEST Buy"
            variant="custom"
            className={styles.button_buy}
            onClick={submitBestOrder}
            disabled={!state.orderQty || state.orderQty > 20e6 || best_order_status === 'New' || !wsCurrentPrice}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Sell"
            label="BEST Sell"
            variant="custom"
            className={styles.button_sell}
            onClick={submitBestOrder}
            disabled={!state.orderQty || state.orderQty > 20e6 || best_order_status === 'New' || !wsCurrentPrice}
          />
        </Grid>
      </>
    );
  }

  return (
    <MainContainer label="MarkerOrder">
      {renderFirstRow()}
      {renderSecondRow()}
    </MainContainer>
  );
});
export {MarketOrderContainer};

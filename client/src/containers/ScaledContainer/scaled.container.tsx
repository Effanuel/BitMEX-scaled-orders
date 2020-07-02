import React, {useEffect, useState} from 'react';
import {Grid, RadioGroup} from '@material-ui/core';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

import {previewOrders, previewToggle, getBalance, scaledOrders} from 'redux/modules/preview';
import {wsConnect, wsDisconnect, wsTickerChange} from 'redux/modules/websocket';
import {websocketBidAskPrices} from 'redux/selectors';
import {AppState} from 'redux/models/state';

import {
  InputField,
  SelectDropdown,
  CustomRadioButton,
  // OrdersPreviewTable,
  MainContainer,
  Button,
} from 'components';
import DistributionsContainer from './distributions.component';

import {DISTRIBUTIONS} from 'util/index';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';
import styles from './styles.module.css';

export interface ScaledContainerState {
  quantity: any;
  n_tp: any;
  start: any;
  end: any;
  stop: any;
  distribution: DISTRIBUTIONS;
  side: SIDE;
  symbol: SYMBOLS;
}

const initialState: Readonly<ScaledContainerState> = {
  quantity: '',
  n_tp: '',
  start: '',
  end: '',
  stop: '',
  distribution: DISTRIBUTIONS.Uniform,
  side: SIDE.SELL,
  symbol: SYMBOLS.XBTUSD,
};

const ScaledContainer = React.memo(() => {
  const dispatch = useDispatch();
  const {wsCurrentPrice, loading, message, orderError} = useSelector(
    (state: AppState) => ({
      wsCurrentPrice: websocketBidAskPrices(state),
      loading: state.websocket.loading,
      // orderLoading: state.preview.loading,
      message: state.websocket.message,
      orderError: state.preview.error,
    }),
    shallowEqual,
  );

  const [state, setState] = useState(initialState);
  const [cache, setCache] = useState(true);

  useEffect(() => {
    dispatch(wsConnect());
    dispatch(getBalance());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  function onChangeDropdown(event: React.ChangeEvent<HTMLInputElement>): void {
    const {value, id} = event.target;
    dispatch(wsTickerChange(value as SYMBOLS));
    setState((prevState) => ({
      ...prevState,
      [id]: value,
      start: '',
      end: '',
      stop: '',
    }));
    //
    //
    setCache(false);
  }

  function onChangeNumber(event: React.ChangeEvent<HTMLInputElement>): void {
    const {id, value} = event.target;
    setState((prevState) => ({...prevState, [id]: +value}));
    setCache(false);
  }

  function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>): void {
    const {value, name} = event.target;
    setState((prevState) => ({...prevState, [name]: value}));
    setCache(false);
  }

  function onOrderSubmit(): void {
    dispatch(scaledOrders(state));
    setCache(false);
  }

  function onPreviewOrders(): void {
    if (cache) {
      dispatch(previewToggle());
    } else {
      setCache(true);
      dispatch(previewOrders(state));
    }
  }

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3} className={styles.container__col}>
          <SelectDropdown id="symbol" onChange={onChangeDropdown} label="Instrument" />
        </Grid>
        <Grid item xs={3}>
          <RadioGroup aria-label="position" name="side" value={state.side} onChange={onChangeRadio}>
            <CustomRadioButton id="scaled_side_sell" label="Sell" value="Sell" />
            <CustomRadioButton id="scaled_side_buy" label="Buy" value="Buy" />
          </RadioGroup>
        </Grid>
        <Grid item xs={3}>
          <div className={styles.text_field}>
            {loading ? 'Loading...' : wsCurrentPrice?.askPrice}

            {/* {wsCurrentPrice || (loading && <SpinnerComponent />)} */}
          </div>
          <div className={styles.message}>{message}</div>
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.stop}
            label="Stop-Loss"
            id="stop"
            stop={true}
            t_placement="bottom"
            tooltip="Price at which to market exit all contracts."
          />
        </Grid>
      </>
    );
  }

  function renderSecondRow() {
    return (
      <>
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.quantity}
            label="Quantity"
            id="quantity"
            tooltip="Number of contracts"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.n_tp}
            label="Order count"
            id="n_tp"
            tooltip="Number of individual orders"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.start}
            label="Range start"
            id="start"
            tooltip="First placed order's price"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.end}
            label="Range end"
            id="end"
            tooltip="Last placed order's price"
          />
        </Grid>
      </>
    );
  }

  function renderThirdRow() {
    return (
      <>
        <Grid item xs={4}>
          <DistributionsContainer onChange={onChangeRadio} distribution={state.distribution} />
        </Grid>
        <Grid item xs={3} className={styles.myErrorMessage}>
          {orderError}
        </Grid>
        <Grid item xs={2} className="text-right">
          <Button label="Preview" onClick={onPreviewOrders} variant="text" disabled={isDisabled(state)} />
        </Grid>
        <Grid item xs={3}>
          <Button label="Submit" onClick={onOrderSubmit} disabled={isDisabled(state)} />
        </Grid>
      </>
    );
  }

  return (
    <MainContainer label="ScaledOrders">
      {renderFirstRow()}
      {renderSecondRow()}
      {renderThirdRow()}
    </MainContainer>
  );
});
export default ScaledContainer;

function isDisabled(state: ScaledContainerState): boolean {
  const {quantity, n_tp, start, end, stop, side} = state;
  const validInputs = !(quantity && n_tp && n_tp > 1 && start && end);
  const validLimits = quantity > 20e6 || n_tp > 50;
  return (
    validInputs ||
    validLimits ||
    quantity < n_tp ||
    (stop && side === 'Buy' ? stop > start && stop > end : false) ||
    (stop && side === 'Sell' ? stop < start && stop < end : false)
  );
}

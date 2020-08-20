import React from 'react';
import {Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import OrdersPreviewTable from './OrdersPreviewTable/OrdersPreviewTable';
import {previewOrders, previewToggle, postScaledOrders} from 'redux/modules/preview';
import {InputField, SelectDropdown, MainContainer, Button, SideRadioButtons} from 'components';
import DistributionsRadioGroup from './DistributionsRadioGroup';
import {DISTRIBUTIONS} from 'util/index';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';
import styles from './scaled.container.module.scss';
import {SCALED_CONTAINER} from 'data-test-ids';
import {useReduxSelector} from 'redux/helpers/hookHelpers';

export interface ScaledContainerState {
  orderQty: null | number;
  n_tp: null | number;
  start: null | number;
  end: null | number;
  stop: null | number;
  distribution: DISTRIBUTIONS;
  side: SIDE;
  symbol: SYMBOLS;
}

const initialState: Readonly<ScaledContainerState> = {
  orderQty: null,
  n_tp: null,
  start: null,
  end: null,
  stop: null,
  distribution: DISTRIBUTIONS.Uniform,
  side: SIDE.SELL,
  symbol: SYMBOLS.XBTUSD,
};

const ScaledContainer = React.memo(() => {
  const dispatch = useDispatch();
  const {error: orderError, showPreview} = useReduxSelector('error', 'showPreview');

  const [state, setState] = React.useState(initialState);
  const [cache, setCache] = React.useState(true);

  function onChangeDropdown({target: {value, id}}: InputChange): void {
    setState((prevState) => ({...prevState, [id]: value, start: null, end: null, stop: null}));
    setCache(false);
  }

  function onChangeNumber({target: {id, value}}: InputChange): void {
    setState((prevState) => ({...prevState, [id]: +value}));
    setCache(false);
  }

  function toggleSide({target: {value, name}}: InputChange): void {
    setState((prevState) => ({...prevState, [name]: value}));
    setCache(false);
  }

  function onOrderSubmit(): void {
    const {distribution, ...scaledParams} = state as RequiredProperty<ScaledContainerState>;
    dispatch(postScaledOrders(scaledParams, distribution));
    setState(initialState);
    setCache(false);
  }

  function onPreviewOrders(): void {
    if (cache) {
      dispatch(previewToggle());
    } else {
      setCache(true);
      const {distribution, ...ordersProps} = state as RequiredProperty<ScaledContainerState>;
      dispatch(previewOrders(ordersProps, distribution));
    }
  }

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3} className={styles.container__col}>
          <SelectDropdown id="symbol" onChange={onChangeDropdown} label="Instrument" />
        </Grid>
        <Grid item xs={2}>
          <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={3}>
          <InputField
            onChange={onChangeNumber}
            value={state.stop}
            label="Stop-Loss"
            id="stop"
            stop={true}
            t_placement="bottom"
            tooltip="Price at which to market exit placed contracts."
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
            value={state.orderQty}
            label="Quantity"
            id="orderQty"
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
          <DistributionsRadioGroup onChange={toggleSide} distribution={state.distribution} />
        </Grid>
        <Grid item xs={3} className={styles.myErrorMessage}>
          {orderError}
        </Grid>
        <Grid item xs={2} className="text-right">
          <Button
            testID={SCALED_CONTAINER.PREVIEW_BUTTON}
            label="Preview"
            onClick={onPreviewOrders}
            variant="text"
            disabled={isDisabled(state)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            testID={SCALED_CONTAINER.SUBMIT_BUTTON}
            label="Submit"
            variant="buy"
            onClick={onOrderSubmit}
            disabled={isDisabled(state)}
          />
        </Grid>
      </>
    );
  }

  return (
    <>
      <MainContainer
        label="ScaledOrders"
        description="Place limit orders in a range"
        renderOutside={showPreview && <OrdersPreviewTable />}
      >
        {renderFirstRow()}
        {renderSecondRow()}
        {renderThirdRow()}
      </MainContainer>
    </>
  );
});
export default ScaledContainer;

function isDisabled(state: ScaledContainerState): boolean {
  const {orderQty, n_tp, start, end, stop, side} = state;
  if (!orderQty || !n_tp || !start || !end || !side) {
    return true;
  }
  const validInputs = !(n_tp > 1);
  const validLimits = orderQty > 20e6 || n_tp > 50;
  const validOrdersWithBuyStop = !!stop && (side === 'Buy' ? stop > start && stop > end : false);
  const validOrdersWithSellStop = !!stop && (side === 'Sell' ? stop < start && stop < end : false);
  return validInputs || validLimits || orderQty < n_tp || validOrdersWithBuyStop || validOrdersWithSellStop;
}

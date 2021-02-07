import React from 'react';
import {useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import {Text} from '@chakra-ui/react';
import OrdersPreviewTable from './OrdersPreviewTable/OrdersPreviewTable';
import {previewOrders, previewToggle, postOrderBulk} from 'redux/modules/preview/previewModule';
import {InputField, SelectDropdown, MainContainer, Button, SideRadioButtons} from 'components';
import DistributionsRadioGroup from './DistributionsRadioGroup';
import {createScaledOrders, DISTRIBUTIONS} from 'util/index';
import {SIDE, SYMBOLS} from 'redux/api/bitmex/types';
import styles from './ScaledOrders.module.scss';
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

export default React.memo(function ScaledContainer() {
  const dispatch = useDispatch();
  const {error, showPreview, previewLoading} = useReduxSelector('error', 'showPreview', 'previewLoading');

  const [state, setState] = React.useState(initialState);
  const [isDirty, setDirty] = React.useState(false);

  const onChangeDropdown = React.useCallback(({target: {value, id}}: InputChange): void => {
    setState((prevState) => ({...prevState, [id]: value, start: null, end: null, stop: null}));
    setDirty(true);
  }, []);

  const onChangeNumber = React.useCallback(({target: {id, value}}: InputChange): void => {
    setState((prevState) => ({...prevState, [id]: +value}));
    setDirty(true);
  }, []);

  const toggleSide = React.useCallback(({target: {value, name}}: InputChange): void => {
    setState((prevState) => ({...prevState, [name]: value}));
    setDirty(true);
  }, []);

  const onOrderSubmit = React.useCallback((): void => {
    const {distribution, ...ordersProps} = state as RequiredProperty<ScaledContainerState>;
    dispatch(postOrderBulk(createScaledOrders({ordersProps, distribution})));
    setState(initialState);
    setDirty(true);
  }, [dispatch, state]);

  const onPreviewOrders = React.useCallback((): void => {
    if (!isDirty) {
      dispatch(previewToggle());
    } else {
      setDirty(false);
      const {distribution, ...ordersProps} = state as RequiredProperty<ScaledContainerState>;
      dispatch(previewOrders(ordersProps, distribution));
    }
  }, [dispatch, state, isDirty]);

  const renderFirstRow = React.useMemo(() => {
    return (
      <>
        <SelectDropdown id="symbol" onChange={onChangeDropdown} label="Instrument" />
        <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        <Grid item xs={6} />
        <InputField
          data-test-id={SCALED_CONTAINER.STOP_LOSS_INPUT}
          onChange={onChangeNumber}
          value={state.stop}
          label="Stop-Loss"
          id="stop"
          stop={true}
          t_placement="bottom"
          tooltip="(Optional) Price at which to market exit placed contracts."
        />
      </>
    );
  }, [onChangeNumber, onChangeDropdown, toggleSide, state.side, state.stop]);

  const renderSecondRow = React.useMemo(() => {
    return (
      <>
        <InputField
          data-test-id={SCALED_CONTAINER.QUANTITY_INPUT}
          onChange={onChangeNumber}
          value={state.orderQty}
          label="Quantity"
          id="orderQty"
          tooltip="Number of contracts"
        />
        <InputField
          data-test-id={SCALED_CONTAINER.ORDER_COUNT_INPUT}
          onChange={onChangeNumber}
          value={state.n_tp}
          label="Order count"
          id="n_tp"
          tooltip="Number of individual orders"
        />
        <InputField
          data-test-id={SCALED_CONTAINER.RANGE_START_INPUT}
          onChange={onChangeNumber}
          value={state.start}
          label="Range start"
          id="start"
          tooltip="First placed order's price"
        />
        <InputField
          data-test-id={SCALED_CONTAINER.RANGE_END_INPUT}
          onChange={onChangeNumber}
          value={state.end}
          label="Range end"
          id="end"
          tooltip="Last placed order's price"
        />
      </>
    );
  }, [onChangeNumber, state]);

  const renderThirdRow = React.useMemo(() => {
    return (
      <>
        <DistributionsRadioGroup onChange={toggleSide} distribution={state.distribution} />
        <Grid item xs={6} className={styles.myErrorMessage}>
          {error}
        </Grid>
        <Text
          data-testid={SCALED_CONTAINER.PREVIEW_BUTTON}
          textStyle="regular"
          onClick={onPreviewOrders}
          aria-disabled={isDisabled(state)}
        >
          Preview
        </Text>
        <Button
          testID={SCALED_CONTAINER.SUBMIT_BUTTON}
          label="Submit"
          isLoading={previewLoading}
          variant={SIDE.BUY}
          onClick={onOrderSubmit}
          disabled={isDisabled(state)}
        />
      </>
    );
  }, [toggleSide, onOrderSubmit, onPreviewOrders, error, state, previewLoading]);

  const renderOutside = React.useMemo(
    () => showPreview && <OrdersPreviewTable {...(state as RequiredProperty<ScaledContainerState>)} />,
    [showPreview, state],
  );

  return (
    <MainContainer label="Scaled Orders" description="Place limit orders in a range" renderOutside={renderOutside}>
      {renderFirstRow}
      {renderSecondRow}
      {renderThirdRow}
    </MainContainer>
  );
});

function isDisabled(state: ScaledContainerState): boolean {
  const {orderQty, n_tp, start, end, stop, side} = state;
  if (!orderQty || !n_tp || !start || !end || !side) return true;

  const validInputs = !(n_tp > 1);
  const validLimits = orderQty > 20e6 || n_tp > 50;
  const validOrdersWithBuyStop = !!stop && (side === 'Buy' ? stop > start && stop > end : false);
  const validOrdersWithSellStop = !!stop && (side === 'Sell' ? stop < start && stop < end : false);
  return validInputs || validLimits || orderQty < n_tp || validOrdersWithBuyStop || validOrdersWithSellStop;
}

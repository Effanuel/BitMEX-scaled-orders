import React from 'react';
import {useDispatch} from 'react-redux';
import {Box, Text} from '@chakra-ui/react';
import OrdersPreviewTable from './OrdersPreviewTable/OrdersPreviewTable';
import {previewOrders, previewToggle, postOrderBulk} from 'redux/modules/preview/previewModule';
import {InputField, SelectDropdown, MainContainer, Button, SideRadioButtons, Row} from 'components';
import DistributionsRadioGroup from './DistributionsRadioGroup';
import {createScaledOrders, DISTRIBUTION, INSTRUMENT_PARAMS} from 'utils';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {SCALED_CONTAINER} from 'data-test-ids';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {WarningTwoIcon} from '@chakra-ui/icons';

const icons = [{element: WarningTwoIcon, color: 'red', onHoverMessage: 'Minimum lotsize for XBT is 100'}];

interface ScaledContainerState {
  orderQty: null | number;
  n_tp: null | number;
  start: null | number;
  end: null | number;
  stop: null | number;
  distribution: DISTRIBUTION;
  side: SIDE;
  symbol: SYMBOL;
}

const initialState: Readonly<ScaledContainerState> = {
  orderQty: null,
  n_tp: null,
  start: null,
  end: null,
  stop: null,
  distribution: DISTRIBUTION.Uniform,
  side: SIDE.SELL,
  symbol: SYMBOL.XBTUSD,
};

export default React.memo(function ScaledContainer() {
  const dispatch = useDispatch();
  const {error, showPreview, previewLoading} = useReduxSelector('error', 'showPreview', 'previewLoading');

  const [state, setState] = React.useState(initialState);
  const [isDirty, setDirty] = React.useState(false);

  const onChangeDropdown = React.useCallback((symbol: SYMBOL): void => {
    setState((prevState) => ({...prevState, symbol, start: null, end: null, stop: null}));
    setDirty(true);
  }, []);

  const onChangeNumber = React.useCallback((value: string | number, id: string): void => {
    setState((prevState) => ({...prevState, [id]: value}));
    setDirty(true);
  }, []);

  const toggleSide = React.useCallback((value: SIDE): void => {
    setState((prevState) => ({...prevState, side: value}));
    setDirty(true);
  }, []);

  const onChangeDistribution = React.useCallback((value: string): void => {
    setState((prevState) => ({...prevState, distribution: value as DISTRIBUTION}));
    setDirty(true);
  }, []);

  const onOrderSubmit = React.useCallback((): void => {
    const {distribution, ...rest} = state as RequiredProperty<ScaledContainerState>;
    const ordersProps = {...rest, start: +rest.start, end: +rest.end, stop: rest.stop != undefined ? +rest.stop : 0};
    dispatch(postOrderBulk(createScaledOrders({ordersProps, distribution})));
    setState(initialState);
    setDirty(true);
  }, [dispatch, state]);

  const onPreviewOrders = React.useCallback((): void => {
    if (!isDirty) {
      dispatch(previewToggle());
    } else {
      setDirty(false);
      const {distribution, ...rest} = state as RequiredProperty<ScaledContainerState>;
      const ordersProps = {...rest, start: +rest.start, end: +rest.end, stop: rest.stop != undefined ? +rest.stop : 0};
      dispatch(previewOrders(ordersProps, distribution));
    }
  }, [dispatch, state, isDirty]);

  const step = 1 / INSTRUMENT_PARAMS[state.symbol].ticksize;

  const renderFirstRow = React.useMemo(() => {
    return (
      <Row>
        <SelectDropdown id="symbol" onChange={onChangeDropdown} label="Instrument" />
        <SideRadioButtons testID={SCALED_CONTAINER.SIDE} onChangeRadio={toggleSide} side={state.side} />
        <Box width="35%" />
        <InputField
          testID={SCALED_CONTAINER.STOP_LOSS_INPUT}
          id="stop"
          onChange={onChangeNumber}
          value={state.stop}
          label="Stop-Loss"
          stop={true}
          t_placement="bottom"
          tooltip="(Optional) Price at which to market exit placed contracts."
          step={step}
        />
      </Row>
    );
  }, [onChangeNumber, onChangeDropdown, toggleSide, state.side, state.stop, step]);

  const renderSecondRow = React.useMemo(() => {
    return (
      <Row>
        <InputField
          testID={SCALED_CONTAINER.QUANTITY_INPUT}
          id="orderQty"
          onChange={onChangeNumber}
          value={state.orderQty}
          label="Quantity"
          tooltip="Number of contracts"
        />
        <InputField
          testID={SCALED_CONTAINER.ORDER_COUNT_INPUT}
          id="n_tp"
          onChange={onChangeNumber}
          value={state.n_tp}
          label="Order count"
          tooltip="Number of individual orders"
        />
        <InputField
          testID={SCALED_CONTAINER.RANGE_START_INPUT}
          id="start"
          onChange={onChangeNumber}
          value={state.start}
          label="Range start"
          tooltip="First placed order's price"
          step={step}
        />
        <InputField
          testID={SCALED_CONTAINER.RANGE_END_INPUT}
          id="end"
          onChange={onChangeNumber}
          value={state.end}
          label="Range end"
          tooltip="Last placed order's price"
          step={step}
        />
      </Row>
    );
  }, [onChangeNumber, state, step]);

  const renderThirdRow = React.useMemo(() => {
    return (
      <Row>
        <DistributionsRadioGroup onChange={onChangeDistribution} distribution={state.distribution} />
        <Box width="50%">{error}</Box>
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
      </Row>
    );
  }, [onOrderSubmit, onPreviewOrders, error, state, previewLoading, onChangeDistribution]);

  const renderOutside = React.useMemo(() => showPreview && <OrdersPreviewTable />, [showPreview]);

  return (
    <MainContainer
      label="Scaled Orders"
      description="Place limit orders in a range"
      renderOutside={renderOutside}
      icons={state.symbol === SYMBOL.XBTUSD ? icons : undefined}
    >
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
  return (
    validInputs ||
    validLimits ||
    orderQty < n_tp ||
    validOrdersWithBuyStop ||
    validOrdersWithSellStop ||
    (state.symbol === SYMBOL.XBTUSD && orderQty % 100 !== 0)
  );
}

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  postTrailingOrder,
  __clearTrailingOrder,
  cancelTrailingOrder,
  changeTrailingOrderSymbol,
} from 'redux/modules/trailing/trailingModule';
import {MainContainer, SelectDropdown, InputField, Button, SideRadioButtons} from 'components';
import {SYMBOLS, ORD_TYPE, SIDE} from 'redux/api/bitmex/types';
import buildOrderPresenter from '../../presenters/trailing-label-presenter';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {Grid, Text} from '@chakra-ui/react';
import {useHooks} from './useHooks';

interface State {
  symbol: SYMBOLS;
  orderQty: number | null;
  side: SIDE;
}

const initialState = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: null,
  side: SIDE.SELL,
};

const TrailingLimitOrderContainer = React.memo(() => {
  const dispatch = useDispatch();

  const [state, setState] = useState<Readonly<State>>(initialState);

  const {
    wsCurrentPrice,
    wsBidAskPrices,
    trailOrderId,
    trailOrderStatus,
    trailOrderPrice,
    status,
    connected,
  } = useHooks();

  const trailingOrderPrice = React.useMemo(
    () => (state.side === SIDE.SELL ? wsBidAskPrices?.askPrice : wsBidAskPrices?.bidPrice),
    [state.side, wsBidAskPrices],
  );

  const submitTrailingOrder = React.useCallback(() => {
    if (trailingOrderPrice && state.orderQty) {
      const payload = {
        ...state,
        orderQty: state.orderQty,
        price: trailingOrderPrice,
        side: state.side,
        ordType: ORD_TYPE.Limit,
        text: 'best_order',
      };

      dispatch(postTrailingOrder(payload));
      setState((prevState) => ({...prevState, orderQty: null}));
    }
  }, [dispatch, state, trailingOrderPrice]);

  const cancelOrder = React.useCallback(() => {
    if (trailOrderId) {
      dispatch(cancelTrailingOrder({orderID: trailOrderId}));
    }
  }, [dispatch, trailOrderId]);

  const onChangeNumber = React.useCallback(({target: {id, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [id]: +value}));
  }, []);

  const toggleInstrument = React.useCallback(
    ({target: {id, value}}: InputChange) => {
      dispatch(changeTrailingOrderSymbol(value as SYMBOLS));
      setState((prevState) => ({...prevState, [id]: value}));
    },
    [dispatch],
  );

  const toggleSide = React.useCallback(({target: {name, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [name]: value}));
  }, []);

  const buttonLabel = React.useMemo(
    () => buildOrderPresenter(connected, trailingOrderPrice, status || '', trailOrderStatus),
    [connected, trailingOrderPrice, status, trailOrderStatus],
  );

  const renderFirstRow = React.useMemo(() => {
    return (
      <>
        <SelectDropdown
          id="symbol"
          onChange={toggleInstrument}
          label="Instrument"
          disabled={!connected || trailOrderStatus === 'Order placed.'}
        />
        <InputField
          data-test-id={TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT}
          id="orderQty"
          onChange={onChangeNumber}
          value={state.orderQty}
          label="Quantity"
        />
        <SideRadioButtons testID={TRAILING_LIMIT_CONTAINER.SIDE_BUTTONS} onChangeRadio={toggleSide} side={state.side} />
        <Button
          testID={TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER}
          label={buttonLabel.label}
          variant={state.side}
          style={{width: '170px'}}
          onClick={submitTrailingOrder}
          disabled={!state.orderQty || state.orderQty > 20e6 || !wsCurrentPrice || buttonLabel.disabled}
        />
      </>
    );
  }, [
    onChangeNumber,
    connected,
    submitTrailingOrder,
    state,
    trailOrderStatus,
    wsCurrentPrice,
    toggleSide,
    toggleInstrument,
    buttonLabel,
  ]);

  const renderSecondRow = React.useMemo(() => {
    return (
      <>
        <div style={{flexDirection: 'column', display: 'flex'}}>
          <span style={{color: 'white'}}>Trail order status: </span>
          <span style={{color: 'green'}}>{trailOrderStatus}</span>
        </div>
        {trailOrderPrice ? (
          <div style={{flexDirection: 'column', display: 'flex'}}>
            <div style={{color: 'white'}}>Trail order price: </div>
            <div style={{color: 'green'}}>{trailOrderPrice}</div>
          </div>
        ) : null}
        {connected && wsCurrentPrice && trailOrderStatus === 'Order placed.' ? (
          <Text textStyle="red" onClick={cancelOrder}>
            Cancel Trailing Order
          </Text>
        ) : null}
      </>
    );
  }, [connected, cancelOrder, trailOrderPrice, trailOrderStatus, wsCurrentPrice]);

  return (
    <MainContainer
      connected={connected}
      label="Trailing Limit Order"
      description="Place a limit order to trail market price"
    >
      {renderFirstRow}
      {renderSecondRow}
    </MainContainer>
  );
});

export default TrailingLimitOrderContainer;

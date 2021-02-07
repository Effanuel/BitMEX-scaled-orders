import React from 'react';
import {useDispatch} from 'react-redux';
import {MainContainer, SelectDropdown, InputField, Button, SideRadioButtons} from 'components';
import {SYMBOLS, SIDE} from 'redux/api/bitmex/types';
import {CROSS_ORDER_CONTAINER} from 'data-test-ids';
import buildOrderPresenter from '../../presenters/cross-label-presenter';
import {clearCrossOrder, createCrossOrder} from 'redux/modules/cross/crossModule';
import {useHooks} from './useHooks';
import {useSimpleDispatch, useStateChange} from 'general/hooks';

interface State {
  symbol: SYMBOLS;
  price: number | null;
  orderQty: number | null;
  side: SIDE;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  price: null,
  orderQty: null,
  side: SIDE.SELL,
};

const CrossOrderContainer = React.memo(() => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState(initialState);

  const {wsCrossPrice, connected, crossOrderPrice} = useHooks();

  // TODO: Simplify passing callbacks to components
  const onChangeNumber = React.useCallback(({target: {id, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [id]: +value}));
  }, []);

  const toggleInstrument = useStateChange(setState, 'id', 'value');

  const toggleSide = useStateChange(setState, 'name', 'value');

  const createOrder = React.useCallback(() => {
    const {price, symbol, side, orderQty} = state;
    if (price && price > 0 && orderQty && orderQty > 0) {
      dispatch(createCrossOrder({price, symbol, side, orderQty}));
      setState((prevState) => ({...prevState, price: null, orderQty: null}));
    }
  }, [dispatch, state]);

  const cancelCrossOrder = useSimpleDispatch(dispatch, clearCrossOrder);

  const buttonLabel = React.useMemo(() => buildOrderPresenter(connected, state.side, wsCrossPrice, crossOrderPrice), [
    connected,
    crossOrderPrice,
    state.side,
    wsCrossPrice,
  ]);

  const renderFirstRow = React.useMemo(() => {
    const isSubmitButtonDisabled =
      !state.orderQty || state.orderQty > 20e6 || !!!state.price || !wsCrossPrice || buttonLabel.disabled;

    return (
      <>
        <SelectDropdown id="symbol" onChange={toggleInstrument} label="Instrument" disabled={buttonLabel.disabled} />
        <InputField
          data-test-id={CROSS_ORDER_CONTAINER.QUANTITY_INPUT}
          id="orderQty"
          onChange={onChangeNumber}
          value={state.orderQty}
          label="Quantity"
        />
        <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        <Button
          testID={CROSS_ORDER_CONTAINER.SUBMIT}
          label={buttonLabel.label}
          variant={state.side}
          style={{width: '170px'}}
          onClick={createOrder}
          disabled={isSubmitButtonDisabled}
        />
      </>
    );
  }, [onChangeNumber, createOrder, wsCrossPrice, toggleInstrument, toggleSide, buttonLabel, state]);

  const renderSecondRow = React.useMemo(() => {
    return (
      <>
        <InputField
          data-test-id={CROSS_ORDER_CONTAINER.PRICE_INPUT}
          id="price"
          onChange={onChangeNumber}
          value={state.price}
          label="Price"
        />
        <div style={{flexDirection: 'column', display: 'flex'}}>
          <span style={{color: 'white'}}>Cross order status: </span>
          <span style={{color: 'green'}}>{crossOrderPrice ? 'Order is placed' : 'Order not placed.'}</span>
        </div>
        {crossOrderPrice ? (
          <div style={{flexDirection: 'column', display: 'flex'}}>
            <div style={{color: 'white'}}>Cross order price: </div>
            <div style={{color: 'green'}}>{crossOrderPrice}</div>
          </div>
        ) : null}
        {connected && crossOrderPrice ? (
          <Button
            testID={CROSS_ORDER_CONTAINER.CANCEL_ORDER}
            variant="textSell"
            onClick={cancelCrossOrder}
            label={'Cancel Cross Order'}
          />
        ) : null}
      </>
    );
  }, [cancelCrossOrder, connected, crossOrderPrice, onChangeNumber, state.price]);

  return (
    <MainContainer
      connected={connected}
      label="Cross Order"
      description="Place a market order when the price crosses your set price"
    >
      {renderFirstRow}
      {renderSecondRow}
    </MainContainer>
  );
});

export default CrossOrderContainer;

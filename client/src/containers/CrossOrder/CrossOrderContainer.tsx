import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {MainContainer, SelectDropdown, InputField, Button, SideRadioButtons} from 'components';
import {SYMBOLS, SIDE} from 'util/BitMEX-types';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import styles from './CrossOrderContainer.module.scss';
import buildOrderPresenter from '../../presenters/cross-label-presenter';
import {clearCrossOrder, createCrossOrder, orderCrossedOnce, postMarketOrder} from 'redux/modules/cross/crossModule';

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

  const [state, setState] = useState(initialState);

  const {
    wsCrossPrice,
    connected,
    crossOrderPrice,
    crossOrderSide,
    crossOrderQuantity,
    crossOrderSymbol,
    hasPriceCrossedOnce,
    hasCrossedOnce,
    hasCrossedSecondTime,
  } = useReduxSelector(
    'wsCrossPrice',
    'connected',
    'crossOrderPrice',
    'crossOrderSide',
    'crossOrderQuantity',
    'crossOrderSymbol',
    'hasPriceCrossedOnce',
    'hasCrossedOnce',
    'hasCrossedSecondTime',
  );

  React.useEffect(() => {
    if (!hasPriceCrossedOnce && hasCrossedOnce) {
      //TODO RENAME
      dispatch(orderCrossedOnce());
    }
  }, [dispatch, hasPriceCrossedOnce, hasCrossedOnce]);

  React.useEffect(() => {
    if (hasPriceCrossedOnce && hasCrossedSecondTime) {
      dispatch(postMarketOrder({symbol: crossOrderSymbol, orderQty: crossOrderQuantity, side: crossOrderSide}));
    }
  }, [dispatch, crossOrderSymbol, crossOrderQuantity, crossOrderSide, hasPriceCrossedOnce, hasCrossedSecondTime]);

  // TODO: Simplify passing callbacks to components
  const onChangeNumber = React.useCallback(({target: {id, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [id]: +value}));
  }, []);

  const toggleInstrument = React.useCallback(({target: {id, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [id]: value}));
  }, []);

  const toggleSide = React.useCallback(({target: {name, value}}: InputChange) => {
    setState((prevState) => ({...prevState, [name]: value}));
  }, []);

  const createOrder = React.useCallback(() => {
    const {price, symbol, side, orderQty} = state;
    if (price && price > 0 && orderQty && orderQty > 0) {
      dispatch(createCrossOrder({price, symbol, side, orderQty}));
      setState((prevState) => ({...prevState, price: null, orderQty: null}));
    }
  }, [dispatch, state]);

  const cancelCrossOrder = React.useCallback(() => {
    dispatch(clearCrossOrder());
  }, [dispatch]);

  const buttonLabel = React.useMemo(
    () => buildOrderPresenter(connected, state.side, wsCrossPrice, crossOrderPrice, !!crossOrderPrice),
    [connected, crossOrderPrice, state.side, wsCrossPrice],
  );

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3}>
          <SelectDropdown id="symbol" onChange={toggleInstrument} label="Instrument" disabled={buttonLabel.disabled} />
        </Grid>
        <Grid item xs={3}>
          <InputField
            data-test-id={TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT}
            id="orderQty"
            onChange={onChangeNumber}
            value={state.orderQty}
            label="Quantity"
          />
        </Grid>
        <Grid item xs={2}>
          <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        </Grid>
        <Grid item xs={4} className={styles.top_row}>
          <Button
            testID={TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER}
            label={buttonLabel.label}
            variant={state.side === SIDE.SELL ? 'sell' : 'buy'}
            style={{width: '170px'}}
            onClick={createOrder}
            disabled={
              !state.orderQty || state.orderQty > 20e6 || !!!state.price || !wsCrossPrice || buttonLabel.disabled
            }
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
            data-test-id={TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT}
            id="price"
            onChange={onChangeNumber}
            value={state.price}
            label="Price"
          />
        </Grid>
        <Grid item xs={3}>
          <div style={{flexDirection: 'column', display: 'flex'}}>
            <span style={{color: 'white'}}>Cross order status: </span>
            <span style={{color: 'green'}}>{crossOrderPrice ? 'Order is placed' : 'Order not placed.'}</span>
          </div>
        </Grid>
        <Grid item xs={3}>
          {crossOrderPrice ? (
            <div style={{flexDirection: 'column', display: 'flex'}}>
              <div style={{color: 'white'}}>Cross order price: </div>
              <div style={{color: 'green'}}>{crossOrderPrice}</div>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={3}>
          {connected && crossOrderPrice ? (
            <Button variant="textSell" onClick={cancelCrossOrder} label={'Cancel Cross Order'} />
          ) : null}
        </Grid>
      </>
    );
  }

  return (
    <MainContainer label="Cross Order" description="Place a market order when the price crosses your set price">
      {renderFirstRow()}
      {renderSecondRow()}
    </MainContainer>
  );
});

export default CrossOrderContainer;

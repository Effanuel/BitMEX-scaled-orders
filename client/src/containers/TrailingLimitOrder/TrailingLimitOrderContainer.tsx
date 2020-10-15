import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {
  postTrailingOrder,
  __clearTrailingOrder,
  cancelTrailingOrder,
  changeTrailingOrderSymbol,
} from 'redux/modules/trailing/trailingModule';
import {MainContainer, SelectDropdown, InputField, Button, SideRadioButtons} from 'components';
import {SYMBOLS, ORD_TYPE, SIDE} from 'util/BitMEX-types';
import buildOrderPresenter from '../../presenters/trailing-label-presenter';
import styles from './TrailingLimitOrderContainer.module.scss';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import {useHooks} from './useHooks';

interface State {
  symbol: SYMBOLS;
  orderQty: number | null;
  side: SIDE;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: null,
  side: SIDE.SELL,
};

const TrailingLimitOrderContainer = React.memo(() => {
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

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

  function submitTrailingOrder() {
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
    }
  }

  function cancelOrder() {
    if (trailOrderId) {
      dispatch(cancelTrailingOrder({orderID: trailOrderId}));
    }
  }

  function onChangeNumber({target: {id, value}}: InputChange): void {
    setState((prevState) => ({...prevState, [id]: +value}));
  }

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
    () => buildOrderPresenter(connected, trailingOrderPrice, status, trailOrderStatus),
    [connected, trailingOrderPrice, status, trailOrderStatus],
  );

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3}>
          <SelectDropdown
            id="symbol"
            onChange={toggleInstrument}
            label="Instrument"
            disabled={!connected || trailOrderStatus === 'Order placed.'}
          />
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
            variant={state.side}
            style={{width: '170px'}}
            onClick={submitTrailingOrder}
            disabled={!state.orderQty || state.orderQty > 20e6 || !wsCurrentPrice || buttonLabel.disabled}
          />
        </Grid>
      </>
    );
  }

  function renderSecondRow() {
    return (
      <>
        <Grid item xs={4}>
          <div style={{flexDirection: 'column', display: 'flex'}}>
            <span style={{color: 'white'}}>Trail order status: </span>
            <span style={{color: 'green'}}>{trailOrderStatus}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          {trailOrderPrice ? (
            <div style={{flexDirection: 'column', display: 'flex'}}>
              <div style={{color: 'white'}}>Trail order price: </div>
              <div style={{color: 'green'}}>{trailOrderPrice}</div>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={4}>
          {connected && wsCurrentPrice && trailOrderStatus === 'Order placed.' ? (
            <Button variant="textSell" onClick={cancelOrder} label={'Cancel Trailing Order'} />
          ) : null}
        </Grid>
      </>
    );
  }

  return (
    <MainContainer label="Trailing Limit Order" description="Place a limit order to trail market price">
      {renderFirstRow()}
      {renderSecondRow()}
    </MainContainer>
  );
});

export default TrailingLimitOrderContainer;

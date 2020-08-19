import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {
  postTrailingOrder,
  __clearTrailingOrder,
  ammendTrailingOrder,
  cancelTrailingOrder,
  changeTrailingOrderSymbol,
} from 'redux/modules/trailing';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {MainContainer, SelectDropdown, InputField, Button, SideRadioButtons} from 'components';
import {SYMBOLS, ORD_TYPE, SIDE} from 'util/BitMEX-types';
import buildOrderPresenter from './place-order-presenter';
import styles from './TrailingLimitOrderContainer.module.css';

interface State {
  symbol: SYMBOLS;
  orderQty: number;
  side: SIDE;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: 50,
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
    trailOrderSide,
    status,
    connected,
  } = useReduxSelector(
    'wsCurrentPrice',
    'wsBidAskPrices',
    'trailOrderId',
    'trailOrderStatus',
    'trailOrderPrice',
    'trailOrderSide',
    'status',
    'connected',
  );

  React.useEffect(() => {
    if (wsCurrentPrice) {
      const toAmmend = trailOrderSide === 'Sell' ? wsCurrentPrice < trailOrderPrice : wsCurrentPrice > trailOrderPrice;
      if (trailOrderPrice && toAmmend) {
        dispatch(ammendTrailingOrder({orderID: trailOrderId, price: wsCurrentPrice}));
      }
    }
  }, [dispatch, wsCurrentPrice, trailOrderPrice, trailOrderId, trailOrderSide]);

  React.useEffect(() => {
    const statuses = ['Filled', 'Canceled', 'Order not placed.'];
    if (statuses.includes(status) && trailOrderStatus !== 'Order not placed.') {
      dispatch(__clearTrailingOrder());
    }
  }, [dispatch, trailOrderStatus, status]);

  const trailingOrderPrice = React.useMemo(
    () => (state.side === SIDE.SELL ? wsBidAskPrices?.askPrice : wsBidAskPrices?.bidPrice),
    [state.side, wsBidAskPrices],
  );

  function submitTrailingOrder() {
    if (trailingOrderPrice) {
      const payload = {
        ...state,
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
          <InputField onChange={onChangeNumber} value={state.orderQty} label="Quantity" id="orderQty" />
        </Grid>
        <Grid item xs={2}>
          <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        </Grid>
        <Grid item xs={4} className={styles.top_row}>
          <Button
            label={buttonLabel.label}
            variant={state.side === SIDE.SELL ? 'sell' : 'buy'}
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
            <span style={{color: 'white'}}>Best order status: </span>
            <span style={{color: 'green'}}>{trailOrderStatus}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          {trailOrderPrice ? (
            <div style={{flexDirection: 'column', display: 'flex'}}>
              <div style={{color: 'white'}}>Best order price: </div>
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

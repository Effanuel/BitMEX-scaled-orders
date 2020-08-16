import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {postTrailingOrder, __clearTrailingOrder, ammendTrailingOrder} from 'redux/modules/trailing';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {wsTickerChange} from 'redux/modules/websocket';
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
    console.log('AMMEND CURRENT PIRCE', wsCurrentPrice);
    if (wsCurrentPrice) {
      const toAmmend = trailOrderSide === 'Sell' ? wsCurrentPrice < trailOrderPrice : wsCurrentPrice > trailOrderPrice;
      console.log('TO AMMEENT', toAmmend);
      console.log('PRICE', trailOrderPrice);
      if (trailOrderPrice && toAmmend) {
        console.log('Amending order: ', wsCurrentPrice, trailOrderPrice);
        dispatch(ammendTrailingOrder({orderID: trailOrderId, price: wsCurrentPrice}));
      }
    }
  }, [wsCurrentPrice, trailOrderPrice]);

  React.useEffect(() => {
    console.log('TRAILING  ORDER STATUS', trailOrderStatus, status);
    const statuses = ['Filled', 'Canceled', 'Order not placed.'];
    if (statuses.includes(status) && trailOrderStatus !== 'Order not placed.') {
      // Set a timeout so we can still see a "Canceled" message.
      setTimeout(async () => {
        dispatch(__clearTrailingOrder());
      }, 3000);
    }
  }, [dispatch, trailOrderStatus, status]);

  // useSubscribeOrder(dispatch, connected, trailOrderStatus);

  function submitTrailingOrder() {
    // if (wsCurrentPrice) {
    const trailingOrderPrice = state.side === SIDE.SELL ? wsBidAskPrices?.askPrice : wsBidAskPrices?.bidPrice;
    const payload = {
      ...state,
      price: trailingOrderPrice || 12000,
      side: state.side,
      ordType: ORD_TYPE.Limit,
      text: 'best_order',
    };
    dispatch(postTrailingOrder(payload));
    // }
  }

  function onChangeNumber({target: {id, value}}: React.ChangeEvent<HTMLInputElement>): void {
    setState((prevState) => ({...prevState, [id]: +value}));
  }

  const toggleInstrument = React.useCallback(({target: {id, value}}: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(wsTickerChange(value as SYMBOLS));
    setState((prevState) => ({...prevState, [id]: value}));
  }, []);

  const toggleSide = React.useCallback(({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({...prevState, [name]: value}));
  }, []);

  const buttonLabel = React.useMemo(
    () =>
      buildOrderPresenter(
        connected,
        state.side === SIDE.SELL ? wsBidAskPrices?.askPrice : wsBidAskPrices?.bidPrice,
        status,
      ),
    [connected, state.side, wsBidAskPrices],
  );

  function renderFirstRow() {
    return (
      <>
        <Grid item xs={3}>
          <SelectDropdown id="symbol" onChange={toggleInstrument} label="Instrument" />
        </Grid>
        <Grid item xs={3}>
          <InputField onChange={onChangeNumber} value={state.orderQty} label="Quantity" id="orderQty" />
        </Grid>
        <Grid item xs={2}>
          <SideRadioButtons onChangeRadio={toggleSide} side={state.side} />
        </Grid>
        <Grid item xs={4} className={styles.top_row}>
          <Button
            label={buttonLabel}
            variant={state.side === SIDE.SELL ? 'sell' : 'buy'}
            style={{width: '170px'}}
            onClick={submitTrailingOrder}
            disabled={!state.orderQty || state.orderQty > 20e6 || !wsCurrentPrice}
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
            Best order status: <span style={{color: 'green'}}>{trailOrderStatus}</span>
          </div>
          {/* <div style={{ color: "green" }}>{status}</div> */}
        </Grid>
        <Grid item xs={6}>
          {trailOrderPrice ? (
            <div style={{color: 'white'}}>
              Best order price: <span style={{color: 'green'}}>{trailOrderPrice}</span>
            </div>
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

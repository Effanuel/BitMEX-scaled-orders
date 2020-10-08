import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {postMarketOrder} from 'redux/modules/preview/previewModule';
import {MainContainer, SelectDropdown, InputField, Button} from 'components';
import styles from './styles.module.scss';
import {SYMBOLS, SIDE} from 'util/BitMEX-types';
import {MARKET_CONTAINER} from 'data-test-ids';

interface State {
  symbol: SYMBOLS;
  orderQty: number | null;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: null,
};

const MarketOrderContainer = React.memo(() => {
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

  const submitMarketOrder = React.useCallback(
    ({target: {id}}) => {
      if (state.orderQty) {
        dispatch(postMarketOrder({symbol: state.symbol, orderQty: state.orderQty, side: id as SIDE}));
      }
    },
    [dispatch, state],
  );

  function onChange({target: {id, value, tagName}}: InputChange): void {
    const updated = tagName === 'INPUT' ? +value : value;
    setState((prevState) => ({...prevState, [id]: updated}));
  }

  return (
    <MainContainer label="MarkerOrder" description="Place a market order">
      <Grid item xs={3}>
        <SelectDropdown id="symbol" onChange={onChange} label="Instrument" />
      </Grid>
      <Grid item xs={3}>
        <InputField
          data-test-id={MARKET_CONTAINER.INPUT}
          id="orderQty"
          onChange={onChange}
          value={state.orderQty}
          label="Quantity"
        />
      </Grid>
      <Grid item xs={3} className={styles.top_row}>
        <Button
          testID={MARKET_CONTAINER.BUY_BUTTON}
          id="Buy"
          label="MARKET Buy"
          variant={SIDE.BUY}
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />
      </Grid>
      <Grid item xs={3} className={styles.top_row}>
        <Button
          testID={MARKET_CONTAINER.SELL_BUTTON}
          id="Sell"
          label="MARKET Sell"
          variant={SIDE.SELL}
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />
      </Grid>
    </MainContainer>
  );
});

export default MarketOrderContainer;

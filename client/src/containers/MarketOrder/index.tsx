import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {postMarketOrder} from 'redux/modules/preview';
import {MainContainer, SelectDropdown, InputField, Button} from 'components';
import styles from './styles.module.scss';
import {SYMBOLS, SIDE} from 'util/BitMEX-types';

interface State {
  symbol: SYMBOLS;
  orderQty: number;
}

const initialState: Readonly<State> = {
  symbol: SYMBOLS.XBTUSD,
  orderQty: 50,
};

const MarketOrderContainer = React.memo(() => {
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

  const submitMarketOrder = React.useCallback(
    ({target: {id}}) => {
      dispatch(postMarketOrder({...state, side: id as SIDE}));
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
        <InputField onChange={onChange} value={state.orderQty} label="Quantity" id="orderQty" />
      </Grid>
      <Grid item xs={3} className={styles.top_row}>
        <Button
          id="Buy"
          label="MARKET Buy"
          variant="buy"
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />
      </Grid>
      <Grid item xs={3} className={styles.top_row}>
        <Button
          id="Sell"
          label="MARKET Sell"
          variant="sell"
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />
      </Grid>
    </MainContainer>
  );
});

export default MarketOrderContainer;

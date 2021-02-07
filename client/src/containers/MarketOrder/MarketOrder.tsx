import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {postMarketOrder} from 'redux/modules/preview/previewModule';
import {MainContainer, SelectDropdown, InputField, Button} from 'components';
import {SYMBOLS, SIDE} from 'redux/api/bitmex/types';
import {MARKET_CONTAINER} from 'data-test-ids';
import {useReduxSelector} from 'redux/helpers/hookHelpers';

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

  const {previewLoading} = useReduxSelector('previewLoading');

  const submitMarketOrder = React.useCallback(
    ({target: {id}}) => {
      if (state.orderQty) {
        dispatch(postMarketOrder({symbol: state.symbol, orderQty: state.orderQty, side: id as SIDE}));
      }
    },
    [dispatch, state],
  );

  const onChange = React.useCallback(({target: {id, value, tagName}}: InputChange): void => {
    const updated = tagName === 'INPUT' ? +value : value;
    setState((prevState) => ({...prevState, [id]: updated}));
  }, []);

  return (
    <MainContainer label="Marker Order" description="Place a market order">
      <>
        <SelectDropdown id="symbol" onChange={onChange} label="Instrument" />
        <InputField
          data-test-id={MARKET_CONTAINER.INPUT}
          id="orderQty"
          onChange={onChange}
          value={state.orderQty}
          label="Quantity"
        />
        <Button
          testID={MARKET_CONTAINER.BUY_BUTTON}
          id="Buy"
          isLoading={previewLoading}
          label={'MARKET Buy'}
          variant={SIDE.BUY}
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />

        <Button
          testID={MARKET_CONTAINER.SELL_BUTTON}
          id="Sell"
          isLoading={previewLoading}
          label={'MARKET Sell'}
          variant={SIDE.SELL}
          onClick={submitMarketOrder}
          disabled={!state.orderQty || state.orderQty > 20e6}
        />
      </>
    </MainContainer>
  );
});

export default MarketOrderContainer;

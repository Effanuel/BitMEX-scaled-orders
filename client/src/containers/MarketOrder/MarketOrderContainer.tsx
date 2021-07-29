import React from 'react';
import {WarningTwoIcon} from '@chakra-ui/icons';
import {useDispatch} from 'react-redux';
import {postMarketOrder} from 'redux/modules/preview/previewModule';
import {useReduxSelector} from 'redux/helpers/hookHelpers';
import {SYMBOL, SIDE} from 'redux/api/bitmex/types';
import {MARKET_CONTAINER} from 'data-test-ids';
import {SelectDropdown, InputField, Button, Row, MainContainer} from 'components';

const icons = [{element: WarningTwoIcon, color: 'red', onHoverMessage: 'Minimum lotsize for XBT is 100'}];

export default React.memo(function MarketOrderContainer() {
  const dispatch = useDispatch();

  const [symbol, setSymbol] = React.useState<SYMBOL>(SYMBOL.XBTUSD);
  const [quantity, setQuantity] = React.useState<string>('');

  const {previewLoading} = useReduxSelector('previewLoading');

  const submitMarketOrder = React.useCallback(
    (id: SIDE) => {
      if (quantity) {
        dispatch(postMarketOrder({symbol, orderQty: +quantity, side: id}));
      }
      setQuantity('');
    },
    [dispatch, symbol, quantity],
  );

  return (
    <MainContainer
      label="Market Order"
      description="Place a market order that will be filled immediately"
      icons={symbol === SYMBOL.XBTUSD ? icons : undefined}
    >
      <Row>
        <SelectDropdown id="symbol" onChange={setSymbol} label="Instrument" />
        <InputField testID={MARKET_CONTAINER.INPUT} label="Quantity" onChange={setQuantity} value={quantity} />
        <Button
          testID={MARKET_CONTAINER.BUY_BUTTON}
          id={SIDE.BUY}
          label="MARKET Buy"
          onClick={submitMarketOrder}
          isLoading={previewLoading}
          variant={SIDE.BUY}
          disabled={!quantity || +quantity > 20e6}
        />
        <Button
          testID={MARKET_CONTAINER.SELL_BUTTON}
          id={SIDE.SELL}
          label="MARKET Sell"
          onClick={submitMarketOrder}
          isLoading={previewLoading}
          variant={SIDE.SELL}
          disabled={!quantity || +quantity > 20e6}
        />
      </Row>
    </MainContainer>
  );
});

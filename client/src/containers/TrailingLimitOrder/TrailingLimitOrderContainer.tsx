import React from 'react';
import {useDispatch} from 'react-redux';
import {Text} from '@chakra-ui/react';
import {postTrailingOrder, cancelTrailingOrder, changeTrailingOrderSymbol} from 'redux/modules/trailing/trailingModule';
import {SYMBOL, SIDE} from 'redux/api/bitmex/types';
import {SelectDropdown, InputField, Button, SideRadioButtons, Row, MainContainer} from 'components';
import {TRAILING_LIMIT_CONTAINER} from 'data-test-ids';
import buildOrderPresenter from '../../presenters/trailing-label-presenter';
import {useHooks} from './useHooks';
import {INSTRUMENT_PARAMS} from 'utils';

export default React.memo(function TrailingLimitOrderContainer() {
  const dispatch = useDispatch();

  const [symbol, setSymbol] = React.useState<SYMBOL>(SYMBOL.XBTUSD);
  const [side, setSide] = React.useState<SIDE>(SIDE.SELL);
  const [quantity, setQuantity] = React.useState<string>('');

  const {wsCurrentPrice, wsBidAskPrices, trailOrderId, trailOrderStatus, trailOrderPrice, status, connected} =
    useHooks();

  const spread = 1 / INSTRUMENT_PARAMS[symbol].ticksize;
  const trailingOrderPrice =
    side === SIDE.SELL ? (wsBidAskPrices?.bidPrice ?? 0) + spread : (wsBidAskPrices?.askPrice ?? 0) - spread;

  const submitTrailingOrder = React.useCallback(() => {
    if (trailingOrderPrice && quantity) {
      const payload = {symbol, side, orderQty: +quantity, price: trailingOrderPrice, text: 'best_order'};
      dispatch(postTrailingOrder(payload));
      setQuantity('');
    }
  }, [dispatch, trailingOrderPrice, quantity, side, symbol]);

  const cancelOrder = React.useCallback(() => void dispatch(cancelTrailingOrder({} as any)), [dispatch]);

  const toggleInstrument = React.useCallback(
    (symbol: SYMBOL) => {
      dispatch(changeTrailingOrderSymbol(symbol));
      setSymbol(symbol);
    },
    [dispatch],
  );

  const buttonLabel = React.useMemo(
    () => buildOrderPresenter(connected, trailingOrderPrice, status || '', trailOrderStatus, symbol),
    [connected, trailingOrderPrice, status, trailOrderStatus, symbol],
  );

  const renderFirstRow = React.useMemo(() => {
    return (
      <Row>
        <SelectDropdown
          id="symbol"
          onChange={toggleInstrument}
          label="Instrument"
          disabled={!connected || trailOrderStatus === 'Order placed.'}
        />
        <InputField
          testID={TRAILING_LIMIT_CONTAINER.QUANTITY_INPUT}
          onChange={setQuantity}
          value={quantity}
          label="Quantity"
        />
        <SideRadioButtons testID={TRAILING_LIMIT_CONTAINER.SIDE_BUTTONS} onChangeRadio={setSide} side={side} />
        <Button
          testID={TRAILING_LIMIT_CONTAINER.SUBMIT_TRAILING_ORDER}
          label={buttonLabel.label}
          variant={side}
          style={{width: '170px'}}
          onClick={submitTrailingOrder}
          disabled={!quantity || +quantity > 20e6 || !wsCurrentPrice || buttonLabel.disabled}
        />
      </Row>
    );
  }, [connected, submitTrailingOrder, trailOrderStatus, wsCurrentPrice, toggleInstrument, buttonLabel, quantity, side]);

  const renderSecondRow = React.useMemo(() => {
    return (
      <Row>
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
        {connected && wsCurrentPrice && trailOrderStatus === 'Order placed.' && trailOrderId ? (
          <Text textStyle="red" onClick={cancelOrder}>
            Cancel Trailing Order
          </Text>
        ) : null}
      </Row>
    );
  }, [connected, cancelOrder, trailOrderPrice, trailOrderStatus, wsCurrentPrice, trailOrderId]);

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

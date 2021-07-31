import {formatPrice} from 'general/formatting';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';

export default function buildOrderPresenter(
  connected: boolean,
  side: SIDE,
  wsCurrentPrice: number | undefined,
  crossOrderPrice: number,
  symbol: SYMBOL,
) {
  if (!connected || !!!wsCurrentPrice) {
    return {label: 'Not subscribed to order', disabled: true};
  }

  if (connected && !!crossOrderPrice) {
    return {label: `Cross order is already placed at ${formatPrice(crossOrderPrice, symbol)}`, disabled: true};
  }
  const label = side === SIDE.SELL ? `Place a crossunder-market sell order` : `Place a crossover-market buy order`;
  return {label, disabled: false};
}

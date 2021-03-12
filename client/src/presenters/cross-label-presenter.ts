import {formatPrice} from 'general/formatting';
import {SIDE} from 'redux/api/bitmex/types';

export default function buildOrderPresenter(
  connected: boolean,
  side: SIDE,
  wsCurrentPrice: number | undefined,
  crossOrderPrice: number,
) {
  if (!connected || !!!wsCurrentPrice) {
    return {label: 'Not subscribed to order', disabled: true};
  }

  if (connected && !!crossOrderPrice) {
    return {label: `Cross order is already placed at ${formatPrice(crossOrderPrice)}`, disabled: true};
  }
  const label = side === SIDE.SELL ? `Place a crossunder-market sell order` : `Place a crossover-market buy order`;
  return {label, disabled: false};
}

import {formatPrice} from 'general/formatting';
import {SYMBOL} from 'redux/api/bitmex/types';

export default function buildOrderPresenter(
  connected: boolean,
  wsCurrentPrice: number | undefined,
  status: string,
  trailOrderStatus: string,
  symbol: SYMBOL,
) {
  if (!connected || !!!wsCurrentPrice) {
    return {label: 'Not subscribed to order', disabled: true};
  }

  if (connected && wsCurrentPrice && trailOrderStatus === 'Order placed.') {
    return {label: 'Order is already placed', disabled: true};
  }
  return {label: `Place a trailing limit order at ${formatPrice(wsCurrentPrice, symbol)}`, disabled: false};
}

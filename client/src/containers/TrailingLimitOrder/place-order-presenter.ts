import {formatPrice} from 'general/formatting';

export default function buildOrderPresenter(connected: boolean, wsCurrentPrice: number | undefined, status: string) {
  if (!connected || !!!wsCurrentPrice) {
    return 'Not subscribed to order';
  }

  if (connected && wsCurrentPrice && status === 'Order placed.') {
    return 'Order is already placed';
  }
  return `Place a trailing order at ${formatPrice(wsCurrentPrice)}`;
}

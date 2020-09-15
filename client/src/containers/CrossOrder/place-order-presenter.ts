import {SIDE} from 'util/BitMEX-types';

export default function buildOrderPresenter(
  connected: boolean,
  side: SIDE,
  wsCurrentPrice: number | undefined,
  isOrderCreated: boolean,
) {
  if (!connected || !!!wsCurrentPrice) {
    return {label: 'Not subscribed to order', disabled: true};
  }

  if (connected && isOrderCreated) {
    return {label: 'Cross order is already placed', disabled: true};
  }
  const label = side === SIDE.SELL ? `Place a crossunder-market sell order` : `Place a crossover-market buy order`;
  return {label, disabled: false};
}

import {INSTRUMENT_PARAMS} from '../util/index';
import {SYMBOLS} from '../util/BitMEX-types';

export function formatPrice(price: number | unnull): string {
  if (!price) {
    return '';
  }

  const priceString = price.toString();
  const priceWithDecimal = priceString.indexOf('.') > -1 ? priceString : priceString + '.00';

  return priceWithDecimal.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',');
}

export const tickerRound = (number: number, symbol: SYMBOLS): number => {
  const {ticksize} = INSTRUMENT_PARAMS[symbol];
  return Math.round(number * ticksize) / ticksize;
};

import {INSTRUMENT_PARAMS} from 'utils';
import {SYMBOL} from '../redux/api/bitmex/types';

// @TODO: parse price as string
export function formatPrice(price: number | undefined | null): string {
  if (!price) {
    return '';
  }
  // const priceString = price.toString();
  // const priceWithDecimal = priceString.indexOf('.') > -1 ? priceString : priceString + '.00';
  // return priceWithDecimal.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',');

  return format(price, {decimal: {len: 2, delim: '.'}, whole: {len: 3, delim: ','}});
}

export const tickerRound = (number: number, symbol: SYMBOL): number => {
  const {ticksize} = INSTRUMENT_PARAMS[symbol];
  return Math.round(number * ticksize) / ticksize;
};

export const parseNumber = (number: number, decimalPlaces: number) => parseFloat(number.toFixed(decimalPlaces));

interface Format {
  decimal: {len: number; delim?: string};
  whole: {len: number; delim: string};
}

export function format(value: number, {decimal, whole}: Format): string {
  const regex = '\\d(?=(\\d{' + (whole.len || 3) + '})+' + (decimal.len > 0 ? '\\D' : '$') + ')';
  const num = value.toFixed(Math.max(0, ~~decimal.len + 1)).slice(0, -1);

  return (decimal.delim ? num.replace('.', decimal.delim) : num).replace(
    new RegExp(regex, 'g'),
    '$&' + (whole.delim || ','),
  );
}

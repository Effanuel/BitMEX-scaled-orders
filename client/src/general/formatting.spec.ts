import * as formatting from './formatting';
import {SYMBOL} from '../redux/api/bitmex/types';
import {INSTRUMENT_PARAMS} from 'utils';

describe('formatPrice()', () => {
  const {formatPrice} = formatting;
  it('should format price', () => {
    expect(formatPrice(100_000.5555555)).toEqual('100,000.55');
    expect(formatPrice(100_000.1)).toEqual('100,000.10');
    expect(formatPrice(0.6789)).toEqual('0.67');
    expect(formatPrice(0.67896)).toEqual('0.67');
  });

  it('should add 2 decimal zeroes, if the number is natural', () => {
    expect(formatPrice(100_000)).toEqual('100,000.00');
  });
});

describe('tickerRound()', () => {
  const {tickerRound} = formatting;
  it('should format XBTUSD', () => {
    const symbol = SYMBOL.XBTUSD;
    expect(tickerRound(1_111.12345, symbol)).toEqual(1111);
    expect(tickerRound(2_222.42345, symbol)).toEqual(2222.5);
    expect(tickerRound(3_333.72345, symbol)).toEqual(3333.5);
  });

  it('should format ETHUSD', () => {
    const symbol = SYMBOL.ETHUSD;
    expect(tickerRound(111.12345, symbol)).toEqual(111.1);
    expect(tickerRound(222.42345, symbol)).toEqual(222.4);
    expect(tickerRound(333.72345, symbol)).toEqual(333.7);
  });

  it('should format XRPUSD', () => {
    const symbol = SYMBOL.XRPUSD;
    expect(tickerRound(2.1234599, symbol)).toEqual(2.1235);
    expect(tickerRound(3.4234099, symbol)).toEqual(3.4234);
    expect(tickerRound(4.7234599, symbol)).toEqual(4.7235);
  });
});

describe('parseNumber()', () => {
  const {parseNumber} = formatting;
  it('should format XBTUSD', () => {
    const symbol = SYMBOL.XBTUSD;
    const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];

    expect(parseNumber(1_111.18999, decimal_rounding)).toEqual(1111.2);
    expect(parseNumber(2_222.49999, decimal_rounding)).toEqual(2222.5);
    expect(parseNumber(3_333.79999, decimal_rounding)).toEqual(3333.8);
  });

  it('should format ETHUSD', () => {
    const symbol = SYMBOL.ETHUSD;
    const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];
    expect(parseNumber(111.19399, decimal_rounding)).toEqual(111.2);
    expect(parseNumber(222.40999, decimal_rounding)).toEqual(222.4);
    expect(parseNumber(333.7111, decimal_rounding)).toEqual(333.7);
  });

  it('should format XRPUSD', () => {
    const symbol = SYMBOL.XRPUSD;
    const {decimal_rounding} = INSTRUMENT_PARAMS[symbol];

    expect(parseNumber(2.1234599, decimal_rounding)).toEqual(2.1235);
    expect(parseNumber(3.4234099, decimal_rounding)).toEqual(3.4234);
    expect(parseNumber(4.7234599, decimal_rounding)).toEqual(4.7235);
  });
});

describe('format123', () => {
  const {format} = formatting;

  describe('Without decimals', () => {
    const decimal = {len: 1, delim: ','};
    it('should format if value has even numbers', () => {
      expect(format(1234567891, {decimal, whole: {len: 2, delim: '+'}})).toEqual('12+34+56+78+91,0');
    });

    it('should format if value has odd numbers', () => {
      expect(format(123456789, {decimal, whole: {len: 2, delim: '+'}})).toEqual('1+23+45+67+89,0');
    });

    it('should format 0', () => {
      expect(format(0, {decimal, whole: {len: 2, delim: '+'}})).toEqual('0,0');
    });
  });

  describe('With decimals', () => {
    const decimal = {len: 2, delim: ','};
    it('should format if value has even whole numbers', () => {
      expect(format(1234567891.888888, {decimal, whole: {len: 2, delim: '+'}})).toEqual('12+34+56+78+91,88');
    });

    it('should format if value has odd numbers', () => {
      expect(format(123456789.12345, {decimal, whole: {len: 2, delim: '+'}})).toEqual('1+23+45+67+89,12');
    });

    it('should format 0', () => {
      expect(format(0.88, {decimal, whole: {len: 2, delim: '+'}})).toEqual('0,88');
    });

    it('should add additional zeroes if len is higher than number of elements', () => {
      expect(format(0.88, {decimal: {len: 5, delim: ','}, whole: {len: 5, delim: '+'}})).toEqual('0,88000');
    });
  });
});

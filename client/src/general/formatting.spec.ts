import * as formatting from './formatting';
import {SYMBOLS} from '../util/BitMEX-types';

describe('formatPrice()', () => {
  const {formatPrice} = formatting;
  it('should format price', () => {
    expect(formatPrice(100_000.5555555)).toEqual('100,000.5555555');
    expect(formatPrice(100_000.1)).toEqual('100,000.1');
    expect(formatPrice(0.6789)).toEqual('0.6789');
    expect(formatPrice(0.67896)).toEqual('0.67896');
  });

  it('should add 2 decimal zeroes, if the number is natural', () => {
    expect(formatPrice(100_000)).toEqual('100,000.00');
  });
});

describe('tickerRound()', () => {
  const {tickerRound} = formatting;
  it('should format XBTUSD', () => {
    const symbol = SYMBOLS.XBTUSD;
    expect(tickerRound(1_111.12345, symbol)).toEqual(1111);
    expect(tickerRound(2_222.42345, symbol)).toEqual(2222.5);
    expect(tickerRound(3_333.72345, symbol)).toEqual(3333.5);
  });

  it('should format ETHUSD', () => {
    const symbol = SYMBOLS.ETHUSD;
    expect(tickerRound(111.12345, symbol)).toEqual(111.1);
    expect(tickerRound(222.42345, symbol)).toEqual(222.4);
    expect(tickerRound(333.72345, symbol)).toEqual(333.7);
  });

  it('should format XRPUSD', () => {
    const symbol = SYMBOLS.XRPUSD;
    expect(tickerRound(2.1234599, symbol)).toEqual(2.1235);
    expect(tickerRound(3.4234099, symbol)).toEqual(3.4234);
    expect(tickerRound(4.7234599, symbol)).toEqual(4.7235);
  });
});

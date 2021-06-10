import {SYMBOL} from 'redux/api/bitmex/types';

enum Exchange {
  BITMEX = 'bitmex',
}

export function websocketBaseUrl(exchange: Exchange = Exchange.BITMEX) {
  const baseUrls: {[key in Exchange]: string} = {
    bitmex: `wss://${process.env.REACT_APP___TESTNET === 'true' ? 'testnet' : 'www'}.bitmex.com/realtime?subscribe=`,
  };
  return baseUrls[exchange];
}

export const instrumentTopics = (...symbols: SYMBOL[]) => symbols.map((symbol) => `instrument:${symbol}`).join(',');

import bitmex from './bitmex';

export enum EXCHANGES {
  bitmex,
}

type ExchangeClasses = bitmex;

export const ExchangeClasses: {[key in EXCHANGES]: Class<ExchangeClasses>} = {
  [EXCHANGES.bitmex]: bitmex,
};

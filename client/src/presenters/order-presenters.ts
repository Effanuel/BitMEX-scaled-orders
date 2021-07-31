import {Order, ORD_TYPE, SIDE} from 'redux/api/bitmex/types';

export const presentOrderType = ({ordType, side}: Order): string => {
  switch (ordType) {
    case ORD_TYPE.LimitIfTouched:
    case ORD_TYPE.Limit:
      return side === SIDE.BUY ? 'Limit-Buy' : 'Limit-Sell';
    case ORD_TYPE.StopLimit:
      return 'Stop-Limit';
    case ORD_TYPE.Stop:
      return 'Stop-Market';
    case ORD_TYPE.MarketIfTouched:
      return side === SIDE.BUY ? 'Market-Buy' : 'Market-Sell';
    default:
      return '';
  }
};

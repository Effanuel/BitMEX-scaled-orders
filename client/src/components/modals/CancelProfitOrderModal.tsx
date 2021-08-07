import React from 'react';
import {Modal} from 'components';
import {SYMBOL} from 'redux/api/bitmex/types';
import {useApi} from 'general/hooks';

interface Props {
  symbol: SYMBOL;
  price: number;
  quantity: number;
  orderID: string;
}

export function CancelProfitOrderModal({symbol, price, quantity, orderID}: Props) {
  const {cancelProfitOrder} = useApi();

  const emitConfirm = React.useCallback(() => cancelProfitOrder({orderID}), [cancelProfitOrder, orderID]);

  return (
    <Modal title="Cancel Profit Order" onConfirm={emitConfirm}>
      {`Cancel ${symbol} profit order with price ${price} and quantity ${quantity}`}
    </Modal>
  );
}

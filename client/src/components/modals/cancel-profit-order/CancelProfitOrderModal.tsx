import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelProfitOrder} from 'redux/modules/orders/ordersModule';
import {SYMBOL} from 'redux/api/bitmex/types';
import {ModalType} from 'context/registerModals';

export interface CancelProfitOrderModalProps {
  type: ModalType.CANCEL_PROFIT_ORDER;
  props: Props;
}

interface Props {
  symbol: SYMBOL;
  price: number;
  quantity: number;
  orderID: string;
}

export function CancelProfitOrderModal({symbol, price, quantity, orderID}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => void dispatch(cancelProfitOrder({orderID})), [dispatch, orderID]);

  return (
    <Modal title="Cancel Profit Order" onConfirm={emitConfirm}>
      {`Cancel ${symbol} profit order with price ${price} and quantity ${quantity}`}
    </Modal>
  );
}

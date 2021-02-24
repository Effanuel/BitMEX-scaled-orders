import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelOrder} from 'redux/modules/orders/ordersModule';
import {SYMBOL} from 'redux/api/bitmex/types';
import {ModalType} from 'context/modal-context';

export interface CancelOrderModalProps {
  type: ModalType.CANCEL_ORDER;
  props: {
    symbol: SYMBOL;
    price: number;
    quantity: number;
    orderID: string;
  };
}

interface Props {
  onClose: () => void;
  symbol: SYMBOL;
  price: number;
  quantity: number;
  orderID: string;
}

export function CancelOrderModal({onClose, symbol, price, quantity, orderID}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => void dispatch(cancelOrder({orderID})), [dispatch, orderID]);

  return (
    <Modal title="Cancel Order" onClose={onClose} onConfirm={emitConfirm}>
      {`Cancel ${symbol} order with price ${price} and quantity ${quantity}`}
    </Modal>
  );
}

import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelAllOrders} from 'redux/modules/orders/ordersModule';
import {ModalType} from 'context/registerModals';

export interface CancelAllProfitOrdersModalProps {
  type: ModalType.CANCEL_ALL_PROFIT_ORDERS;
  props: Props;
}

interface Props {
  totalOrders: number;
}

export function CancelAllProfitOrdersModal({totalOrders}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => void dispatch(cancelAllOrders(undefined)), [dispatch]);

  return (
    <Modal title="Cancel All Profit Orders" onConfirm={emitConfirm}>
      {`This will cancel ${totalOrders} order${totalOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

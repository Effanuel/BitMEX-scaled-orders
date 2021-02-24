import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelAllOrders} from 'redux/modules/orders/ordersModule';
import {ModalType} from 'context/modal-context';

export interface CancelAllOrdersModalProps {
  type: ModalType.CANCEL_ALL_ORDERS;
  props: {
    totalOpenOrders: number;
  };
}

interface Props {
  onClose: () => void;
  totalOpenOrders: number;
}

export function CancelAllOrdersModal({onClose, totalOpenOrders}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => void dispatch(cancelAllOrders(undefined)), [dispatch]);

  return (
    <Modal title="Cancel All Orders" onClose={onClose} onConfirm={emitConfirm}>
      {`This will cancel ${totalOpenOrders} order${totalOpenOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

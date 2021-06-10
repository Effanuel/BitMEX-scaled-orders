import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelAllOrders} from 'redux/modules/orders/ordersModule';

interface Props {
  totalOrders: number;
}

export function CancelAllOrdersModal({totalOrders}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => void dispatch(cancelAllOrders()), [dispatch]);

  return (
    <Modal title="Cancel All Orders" onConfirm={emitConfirm}>
      {`This will cancel ${totalOrders} order${totalOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

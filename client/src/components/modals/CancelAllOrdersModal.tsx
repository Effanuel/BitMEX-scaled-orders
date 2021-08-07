import React from 'react';
import {Modal} from 'components';
import {useApi} from 'general/hooks';

interface Props {
  totalOrders: number;
}

export function CancelAllOrdersModal({totalOrders}: Props) {
  const {cancelAllOrders} = useApi();

  return (
    <Modal title="Cancel All Orders" onConfirm={cancelAllOrders}>
      {`This will cancel ${totalOrders} order${totalOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

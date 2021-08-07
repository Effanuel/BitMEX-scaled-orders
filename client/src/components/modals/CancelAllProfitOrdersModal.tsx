import React from 'react';
import {Modal} from 'components';
import {useApi} from 'general/hooks';

interface Props {
  totalOrders: number;
  profitOrderIds: string[];
}

export function CancelAllProfitOrdersModal({totalOrders, profitOrderIds}: Props) {
  const {cancelAllProfitOrders} = useApi();

  const emitConfirm = React.useCallback(
    () => cancelAllProfitOrders({orderID: profitOrderIds}),
    [cancelAllProfitOrders, profitOrderIds],
  );

  return (
    <Modal title="Cancel All Profit Orders" onConfirm={emitConfirm}>
      {`This will cancel ${totalOrders} profit order${totalOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

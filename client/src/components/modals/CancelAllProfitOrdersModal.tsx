import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {cancelAllProfitOrders} from 'redux/modules/orders/ordersModule';

interface Props {
  totalOrders: number;
  profitOrderIds: string[];
}

export function CancelAllProfitOrdersModal({totalOrders, profitOrderIds}: Props) {
  const dispatch = useDispatch();

  const emitConfirm = React.useCallback(() => {
    dispatch(cancelAllProfitOrders({orderID: profitOrderIds}));
  }, [dispatch, profitOrderIds]);

  return (
    <Modal title="Cancel All Profit Orders" onConfirm={emitConfirm}>
      {`This will cancel ${totalOrders} profit order${totalOrders > 1 ? 's' : ''}`}
    </Modal>
  );
}

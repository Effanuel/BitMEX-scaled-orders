import React from 'react';
import {useDispatch} from 'react-redux';
import {Box, Text} from '@chakra-ui/react';
import {Modal} from 'components';
import {cancelOrder} from 'redux/modules/orders/ordersModule';
import {SYMBOL} from 'redux/api/bitmex/types';
import {ModalType} from 'context/registerModals';

export interface CancelOrderModalProps {
  type: ModalType.CANCEL_ORDER;
  props: Props;
}

interface Props {
  symbol: SYMBOL;
  price: number;
  quantity: number;
  orderID: string;
  profitOrderIDs: string[];
}

export function CancelOrderModal({symbol, price, quantity, orderID, profitOrderIDs}: Props) {
  const dispatch = useDispatch();

  const [shouldCancelProfitOrders, setShouldCancelProfitOrders] = React.useState(true);

  const emitConfirm = React.useCallback(() => {
    dispatch(cancelOrder({orderID: [orderID, ...profitOrderIDs]}));
  }, [dispatch, orderID, profitOrderIDs]);

  const toggle = React.useCallback(({target}) => {
    setShouldCancelProfitOrders(target.checked ? true : false);
  }, []);

  return (
    <Modal title="Cancel Order" onConfirm={emitConfirm}>
      {profitOrderIDs.length ? (
        <Box display="flex" flexDir="row" alignItems="center" marginBottom={4}>
          <input type="checkbox" checked={shouldCancelProfitOrders} onChange={toggle} />
          <Text marginLeft={4} fontSize={14}>
            Should it also include profit targets of this order?
          </Text>
        </Box>
      ) : null}

      {`Cancel ${symbol} order with price $${price} and quantity ${quantity}`}
      {shouldCancelProfitOrders && profitOrderIDs.length ? `, with ${profitOrderIDs.length} profit orders` : '.'}
    </Modal>
  );
}

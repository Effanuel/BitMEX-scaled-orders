import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Modal, InputField} from 'components';
import {addProfitTarget} from 'redux/modules/orders/ordersModule';
import {SIDE} from 'redux/api/bitmex/types';
import {ModalType} from 'context/registerModals';
import {AppState} from 'redux/models/state';
import {orderSelector} from 'redux/selectors';
import {ADD_ORDER_MODAL} from 'data-test-ids';

export interface AddProfitTargetModalProps {
  type: ModalType.ADD_PROFIT_TARGET;
  props: Props;
}

interface Props {
  orderID: string;
}

export function AddProfitOrderModal({orderID}: Props) {
  const dispatch = useDispatch();

  const {order} = useSelector((state: AppState) => ({order: orderSelector(state, {orderID})}), shallowEqual);
  const {symbol, side, price: stopPx} = order!;

  const [price, setPrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const addTarget = React.useCallback(() => {
    dispatch(
      addProfitTarget({orderID, side, symbol, stop: stopPx, price: parseInt(price), orderQty: parseInt(quantity)}),
    );
  }, [dispatch, orderID, side, quantity, price, stopPx, symbol]);

  const isConfirmButtonDisabled =
    !parseInt(price) ||
    !parseInt(quantity) ||
    !(side === SIDE.SELL ? parseInt(price) < stopPx : parseInt(price) > stopPx);

  return (
    <Modal title="Add profit target" onConfirm={addTarget} isConfirmButtonDisabled={isConfirmButtonDisabled}>
      <InputField
        data-test-id={ADD_ORDER_MODAL.PRICE}
        label="Price of the limit order that will be placed after open order price is reached"
        value={price || ''}
        placeholder={`Limit ${side === SIDE.BUY ? 'Sell' : 'Buy'} order price`}
        onChange={setPrice}
      />
      <InputField
        data-test-id={ADD_ORDER_MODAL.QUANTITY}
        label="Quantity"
        value={quantity || ''}
        placeholder={'Profit Order Quantity'}
        onChange={setQuantity}
      />
    </Modal>
  );
}

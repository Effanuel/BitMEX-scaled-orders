import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal, InputField} from 'components';
import {addProfitTarget} from 'redux/modules/orders/ordersModule';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {ModalType} from 'context/registerModals';

export interface AddProfitTargetModalProps {
  type: ModalType.ADD_PROFIT_TARGET;
  props: Props;
}

interface Props {
  symbol: SYMBOL;
  side: SIDE;
  price: number;
  orderID: string;
}

export function AddProfitTargetModal({symbol, price: stop, orderID, side}: Props) {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const addTarget = React.useCallback(() => {
    dispatch(addProfitTarget({orderID, side, symbol, stop, price: parseInt(price), orderQty: parseInt(quantity)}));
  }, [dispatch, orderID, side, symbol, stop, quantity, price]);

  const isConfirmButtonDisabled =
    !parseInt(price) || !(side === SIDE.SELL ? parseInt(price) < stop : parseInt(price) > stop) || !parseInt(quantity);
  const profitTargetSide = side === SIDE.BUY ? 'Sell' : 'Buy';

  return (
    <Modal title="Add profit target" onConfirm={addTarget} isConfirmButtonDisabled={isConfirmButtonDisabled}>
      <InputField
        id="profit-target-price"
        label="Add the price of the limit order price that will be placed after open order price is reached"
        value={price || ''}
        placeholder={`Limit ${profitTargetSide} order target price`}
        onChange={setPrice}
      />
      <InputField
        id="profit-target-quantity"
        label="Quantity"
        value={quantity || ''}
        placeholder={'Profit target quantity'}
        onChange={setQuantity}
      />
    </Modal>
  );
}

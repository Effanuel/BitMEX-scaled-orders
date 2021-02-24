import React from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'components';
import {addProfitTarget} from 'redux/modules/orders/ordersModule';
import {SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {ModalType} from 'context/modal-context';
import {InputField} from 'components/InputField/InputField';

export interface AddProfitTargetModalProps {
  type: ModalType.ADD_PROFIT_TARGET;
  props: {
    symbol: SYMBOL;
    side: SIDE;
    price: number;
    quantity: number;
    orderID: string;
  };
}

interface Props {
  onClose: () => void;
  symbol: SYMBOL;
  side: SIDE;
  price: number;
  quantity: number;
  orderID: string;
}

export function AddProfitTargetModal({onClose, symbol, price, quantity, orderID, side}: Props) {
  const [value, setValue] = React.useState('');

  const dispatch = useDispatch();

  const cancel = React.useCallback(() => {
    dispatch(addProfitTarget({orderID, side, symbol, stop: price, price: parseInt(value), orderQty: quantity}));
  }, [dispatch, orderID, side, symbol, price, quantity, value]);

  const isConfirmButtonDisabled =
    !parseInt(value) || !(side === SIDE.SELL ? parseInt(value) < price : parseInt(value) > price);
  const profitTargetSide = side === SIDE.BUY ? 'Sell' : 'Buy';

  return (
    <Modal
      title="Add profit target"
      onClose={onClose}
      onConfirm={cancel}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
    >
      <InputField
        id="profit-target"
        label="Add the price of the limit order price that will be placed after open order price is reached"
        value={value || ''}
        placeholder={`Limit ${profitTargetSide} order target price`}
        onChange={setValue}
      />
    </Modal>
  );
}

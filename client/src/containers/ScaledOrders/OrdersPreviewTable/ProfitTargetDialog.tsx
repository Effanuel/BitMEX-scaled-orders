import React, {Ref} from 'react';
import {useDispatch} from 'react-redux';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button, InputField} from 'components';
import {SIDE, SYMBOLS} from 'util/BitMEX-types';
import {addProfitTarget} from 'redux/modules/preview/previewModule';

interface State {
  price: null | number;
  quantity: null | number;
  triggerPrice: number;
  side: SIDE;
  symbol: SYMBOLS;
}

const initialState: Readonly<State> = {
  price: null,
  quantity: null,
  triggerPrice: 0,
  side: SIDE.SELL,
  symbol: SYMBOLS.XBTUSD,
};

export interface RefProps {
  openDialog: (triggerPrice: number, side: SIDE, symbol: SYMBOLS) => void;
}

const ProfitTargetDialog = React.forwardRef(({}, ref: Ref<RefProps>) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    openDialog: (triggerPrice: number, side: SIDE, symbol: SYMBOLS) => {
      setOpen(true);
      setState((prevState) => ({...prevState, triggerPrice, side, symbol}));
    },
  }));

  const closeDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeNumber = React.useCallback(({target: {id, value}}: InputChange): void => {
    setState((prevState) => ({...prevState, [id]: +value}));
  }, []);

  const addTarget = React.useCallback(() => {
    setOpen(false);
    setState(initialState);
    dispatch(
      addProfitTarget({
        side: state.side,
        orderQty: state.quantity as number,
        price: state.price as number,
        stop: state.triggerPrice,
        symbol: state.symbol,
      }),
    );
  }, [dispatch, state]);

  const disabled =
    !!!state.price ||
    !state.quantity ||
    (state.side === SIDE.SELL ? !!((state.price ?? 0) > state.triggerPrice) : state.price < state.triggerPrice);

  return (
    <Dialog
      PaperProps={{style: {backgroundColor: '#121212', border: '1px solid green', color: 'white'}}}
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a profit target</DialogTitle>
      <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
        <InputField id="price" value={state.price} label="Profit Target Price" onChange={onChangeNumber} />
        <InputField id="quantity" value={state.quantity} label="Quantity" onChange={onChangeNumber} />
      </DialogContent>
      <DialogActions>
        <Button variant="text" label="Cancel" onClick={closeDialog} />
        <Button disabled={disabled} variant="text" label="Confirm" onClick={addTarget} />
      </DialogActions>
    </Dialog>
  );
});

export default ProfitTargetDialog;

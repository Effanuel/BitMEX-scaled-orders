import React, {Ref} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button} from 'components';
import {SIDE, SYMBOLS} from 'redux/api/bitmex/types';

interface State {
  price: null | number;
  quantity: null | number;
  side: SIDE;
  symbol: SYMBOLS;
}

const initialState: Readonly<State> = {
  price: null,
  quantity: null,
  side: SIDE.SELL,
  symbol: SYMBOLS.XBTUSD,
};

export interface RefProps {
  openDialog: (props: State, onConfirm: (e: any) => void) => void;
}

const func = (e: any) => {};

export const ConfirmationModal = React.forwardRef(({}, ref: Ref<RefProps>) => {
  const [state, setState] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [confirmAction, setConfirmAction] = React.useState({func});

  React.useImperativeHandle(ref, () => ({
    openDialog: (dialogRefProps, onConfirm) => {
      setOpen(true);
      setState(dialogRefProps);
      setConfirmAction({func: onConfirm});
    },
  }));

  const closeDialog = React.useCallback(() => setOpen(false), []);

  const confirmDialog = React.useCallback(
    (e: any) => {
      confirmAction.func(e);
      setOpen(false);
    },
    [confirmAction],
  );

  return (
    <Dialog
      PaperProps={{style: {backgroundColor: '#121212', border: '1px solid green', color: 'white'}}}
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Cancel Order?</DialogTitle>
      <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
        Cancel an order with price {state.price}
      </DialogContent>
      <DialogActions>
        <Button variant="textSell" label="Dismiss" onClick={closeDialog} />
        <Button variant="text" label="Yes" onClick={confirmDialog} />
      </DialogActions>
    </Dialog>
  );
});

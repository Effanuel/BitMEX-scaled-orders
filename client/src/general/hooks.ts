import React from 'react';
import {ModalContext} from 'context/modal-context';
import {AnyAction, Dispatch} from 'redux';

export function useSimpleDispatch(dispatch: Dispatch, func: () => AnyAction) {
  return React.useCallback(() => {
    dispatch(func());
  }, [dispatch, func]);
}

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error('Modal context: add wrapper');
  return context;
}

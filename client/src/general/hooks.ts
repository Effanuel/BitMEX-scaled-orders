import React from 'react';
import {ModalContext} from 'context/modal-context';
import {AnyAction, Dispatch} from 'redux';

export function useSimpleDispatch(dispatch: Dispatch, func: () => AnyAction) {
  return React.useCallback(() => {
    dispatch(func());
  }, [dispatch, func]);
}

export function useModal() {
  return React.useContext(ModalContext);
}

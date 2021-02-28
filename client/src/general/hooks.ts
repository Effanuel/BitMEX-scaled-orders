import {ModalContext} from 'context/modal-context';
import * as React from 'react';
import {AnyAction, Dispatch} from 'redux';

export function useSingleton<V>(value: V) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => value, []);
}

export function useSimpleDispatch(dispatch: Dispatch, func: () => AnyAction) {
  return React.useCallback(() => {
    dispatch(func());
  }, [dispatch, func]);
}

export function useModal() {
  return React.useContext(ModalContext);
}

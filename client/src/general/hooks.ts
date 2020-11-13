import * as React from 'react';
import {AnyAction, Dispatch} from 'redux';

export function useSingleton<V>(value: V) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => value, []);
}

export function useStateChange<S>(setState: (value: React.SetStateAction<S>) => void, key: string, value: string) {
  return React.useCallback(({target}: InputChange) => {
    //@ts-ignore
    setState((prevState) => ({...prevState, [target[key]]: target[value]}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useSimpleDispatch(dispatch: Dispatch, func: () => AnyAction) {
  return React.useCallback(() => {
    dispatch(func());
  }, [dispatch, func]);
}

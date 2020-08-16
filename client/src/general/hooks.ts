import * as React from 'react';

export function useSingleCall(fn: void) {
  return React.useCallback(() => fn, [fn]);
}

export function useSingleSetState<P, A>(fn: (value: React.SetStateAction<A>) => void, stateProps: P) {
  return React.useCallback(() => fn((prevState: A) => ({...prevState, ...stateProps})), []);
}

export function useSingleton<V>(value: V) {
  return React.useMemo(() => value, []);
}

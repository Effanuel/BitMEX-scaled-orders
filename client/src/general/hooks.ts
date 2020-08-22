import * as React from 'react';

export function useSingleton<V>(value: V) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => value, []);
}

import _ from 'lodash/fp';
import {AppState} from 'redux/models/state';
import {createMockedStore} from 'tests/mockStore';
import {Inspector} from 'influnt';

export function exists(testID: string): Inspector<boolean> {
  return ({node}) => !!node.queryAllByTestId(testID).length;
}

export function textOf(testID: string): Inspector<string | null> {
  return ({node, locateAll}) => locateAll(testID).textContent ?? ''; //node.queryAllByTestId(testID).map(({textContent}) => textContent);
}

export function countOf(testID: string): Inspector<number> {
  return ({node, locateAll}) => {
    return node.queryAllByTestId(testID).length; //node.queryByTestId(testID)?.childElementCount ?? 0;
  };
}

export function classNameOf(testID: string): Inspector<string | undefined> {
  return ({locateAll}) => locateAll(testID).className;
}

export function isDisabled(testID: string): Inspector<boolean> {
  return ({node}) => !(node.queryByTestId(testID)?.getAttribute('disabled') === null);
}

export function storeActions(): Inspector<string[], ReturnType<typeof createMockedStore>> {
  //@ts-expect-error
  return (context) => {
    //@ts-expect-error
    return context.externalContext.store.getActions().map((action: any) => action.type);
  };
}

export function getState<K extends keyof AppState>(keys: K | string): Inspector<AppState[K]> {
  //@ts-ignore
  return ({externalContext}) => _.get(keys, externalContext.store.getState());
}

import {configureInflunt, Inspector, spyModule} from 'influnt';
import {toast} from 'react-toastify';
import {AppState} from 'redux/models/state';
import {componentContext, withStore} from './drivers';
import {networkProxy} from './proxy';

const toastSpy = spyModule('toast', {
  module: toast,
  parseArgs: (value: any[]) => value[0]?.props,
});

export const createRenderer = configureInflunt({
  providerHoc: withStore,
  spyModules: [toastSpy],
  networkProxy,
});

export const createComponentRenderer = configureInflunt({
  providerHoc: componentContext,
});

export function storeActions(): Inspector<string[], Parameters<typeof withStore>[number]> {
  return ({extraArgs}) => extraArgs.getActions().map(({type}) => type);
}

export function getState<K extends keyof AppState>(
  moduleKey: K,
  key?: keyof AppState[K],
): Inspector<any, Parameters<typeof withStore>[number]> {
  return ({extraArgs}) => {
    const module = extraArgs.getState()[moduleKey];
    return key ? module[key] : module;
  };
}

export function classNameOf(testID: string): Inspector<string | undefined> {
  return ({locateAll}) => locateAll(testID).className;
}

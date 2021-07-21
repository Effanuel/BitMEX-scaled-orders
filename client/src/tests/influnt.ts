import {configureInflunt, spyModule} from 'influnt';
import {toast} from 'react-toastify';
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

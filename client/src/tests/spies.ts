import {toast} from 'react-toastify';
import {createSpyModule} from './wrench/modules';

export const toastSpy = createSpyModule('toast', () => ({
  addListeners: [
    {
      spyInstance: toast as unknown as jest.SpyInstance<void, any[]>,
      expectValue: (incomingValue) => incomingValue[0].props,
    },
  ],
}));

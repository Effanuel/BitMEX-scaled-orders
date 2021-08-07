//@ts-ignore
async function flushPromises(ms?: number) {
  await new Promise(setImmediate);
}

jest.mock('axios');

jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  Object.assign(actual, {toast: jest.fn()});
  return actual;
});

//@ts-ignore
global.flushPromises = flushPromises;

jest.mock('./redux/api/api', () => {
  return {
    APIFacade: require('./tests/proxy').networkProxy.setNetworkTarget(jest.requireActual('./redux/api/api').APIFacade),
  };
});

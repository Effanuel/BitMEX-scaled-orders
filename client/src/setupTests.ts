//@ts-ignore
jest.mock('axios');

async function flushPromises(ms?: number) {
  await new Promise((resolve) => {
    setTimeout(resolve);
    //@ts-ignore
    if (setTimeout.mock) {
      if (ms !== undefined) {
        jest.runTimersToTime(ms);
      } else {
        jest.runAllTimers();
      }
    }
  });
}

jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  Object.assign(actual, {toast: jest.fn()});
  return actual;
});

//@ts-ignore
global.flushPromises = flushPromises;

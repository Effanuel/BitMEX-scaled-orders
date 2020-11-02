jest.mock('axios');

async function flushPromises(ms?: number) {
  await new Promise((resolve) => {
    setTimeout(resolve);
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

global.flushPromises = flushPromises;

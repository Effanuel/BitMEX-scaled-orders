jest.mock('axios');

async function flushPromises(ms) {
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

global.flushPromises = flushPromises;

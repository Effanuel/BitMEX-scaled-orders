export async function flushPromises(ms?: number) {
  await new Promise((resolve) => {
    setTimeout(resolve);
    // @ts-ignore
    if (setTimeout.mock) {
      if (ms !== undefined) {
        jest.runTimersToTime(ms);
      } else {
        jest.runAllTimers();
      }
    }
  });
}

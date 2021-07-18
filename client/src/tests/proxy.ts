import {createNetworkProxy} from 'influnt';
import isEqual from 'lodash/fp/isEqual';

export const networkProxy = createNetworkProxy();

networkProxy.setTracker((key, mocks, logger, methodName) => {
  return async (...args: unknown[]) => {
    if (!mocks.length) console.error('No mocks found');

    const matchedMock = mocks.find(({id, params}) => id === methodName && isEqual(params, args));

    if (!matchedMock) {
      console.error(
        `No mock defined for request: ${methodName}:`,
        ...args,
        `\nDefined mocks: `,
        ...mocks.map((mock) => [mock.id, mock.params]),
      );
    }

    return matchedMock?.promise.then((value) => {
      logger(matchedMock.id, matchedMock.params);
      return value;
    });
  };
});

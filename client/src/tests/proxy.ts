import {createNetworkProxy} from 'influnt';
import {isObject} from 'lodash';
import isEqual from 'lodash/fp/isEqual';

export const networkProxy = createNetworkProxy();

networkProxy.setTracker((key, mocks, logger, exchange) => {
  return (methodName: string) => {
    return async (...args: any[]) => {
      // eslint-disable-next-line no-console
      if (!mocks.length) console.error('No mocks found');

      const matchedMock = mocks.find(({id, params}) => {
        if (isObject(args[0])) {
          //@ts-ignore
          delete args[0].exchange;
          if (Object.keys(args[0]).length === 0) args[0] = undefined;
        }
        return id === methodName && isEqual(params, args);
      });

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
  };
});

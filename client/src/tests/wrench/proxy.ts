import _ from 'lodash/fp';

export function proxy() {
  let mocks: any = {};
  return {
    setNetworkTarget(networkTarget: any) {
      return new Proxy(networkTarget, {
        construct(target, args) {
          const obj = new target(...args);
          return new Proxy(obj, {
            get(target, key) {
              // check if mocks match
              // return + send back response for logging

              return (method: any) => {
                return (props?: any) => {
                  const mockedMethods = Object.values(mocks).map((response: any) => response.apiMethod);
                  if (mockedMethods.includes(method)) {
                    const mockedResponse: any = Object.values(mocks).find(({apiMethod}: any) => apiMethod === method);
                    const mockedProps = mockedResponse?.props;
                    const result = mockedResponse?.result;

                    if (_.isEqual(props, mockedProps)) {
                      return result;
                    } else {
                      console.error(
                        `Expected props of method ${method}:\n${JSON.stringify(props)}\nMocked props:\n${JSON.stringify(
                          mockedProps,
                        )}`,
                      );
                    }
                  } else {
                    throw new Error(
                      `No mocked response for method ${method} was found.\nMocked methods: ${Object.keys(mocks)}`,
                    );
                  }
                };
              };
            },
          });
        },
      });
    },
    setMocks(_mocks: any) {
      mocks = _mocks;
    },
  };
}

// export const networkProxy = proxy();

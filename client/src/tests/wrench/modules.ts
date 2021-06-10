interface SpyListener<T = any, Y extends any[] = any[]> {
  spyInstance: jest.SpyInstance<T, Y>;
  expectValue: (incomingValue: Y) => any;
}

interface SpyGenerator<T, Y extends any[]> {
  addListeners: SpyListener<T, Y>[];
}

export interface SpyModule {
  [key: string]: any;
}

export function createSpyModule<T, Y extends any[]>(
  spyName: string,
  module: () => SpyGenerator<T, Y>,
): () => SpyModule {
  return () => {
    const {spyInstance, expectValue} = module().addListeners[0];
    const accumulator: SpyModule = {[spyName]: undefined};
    //@ts-expect-error
    spyInstance.mockImplementation((...args: Y) => {
      Object.assign(accumulator, {[spyName]: expectValue(args)});
    });
    return accumulator;
  };
}

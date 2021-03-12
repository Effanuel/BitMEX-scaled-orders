// @ts-nocheck
import React from 'react';
import {act, fireEvent, Matcher, render, RenderResult} from '@testing-library/react';
import {withErrorBoundary, withModalContext, withStore} from 'tests/drivers';
import {Inspector} from 'tests/wrench/inspectors';
import {createMockedStore} from 'tests/mockStore';
import {AppState} from 'redux/models/state';
import Queue from './Queue';
import {Constructor, Mixin, MixinConstructors} from './Mixin';
import {SpyModule} from './modules';
import {MOCK, MockedMethods} from 'redux/api/testingApiDesign';

interface TestConfig<P> {
  passProps?: Partial<P>;
  store: Partial<AppState>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createRenderer<P extends React.ComponentProps>(
  component: React.ComponentType<P>,
  passed: {props?: Partial<P>} = {},
) {
  return ({passProps = {}}: Partial<TestConfig<P>> = {}) => {
    const props = {...passed.props, ...passProps};

    const WrenchClass = createWrench([]);

    const context = {
      internalContext: {
        component,
        passed: {...passed, props},
        store: {}, // reduxStore,
      },
      externalContext: {
        store: {}, // reduxStore,
      },
    };

    return new WrenchClass(context);
  };
}

type MatchOptions = {index?: number};

export interface Memory {
  node: RenderResult;
  locateAll: (testID: Matcher, options?: MatchOptions) => HTMLElement;
  externalContext: any;
}

type Step = (memory: Memory) => void | Promise<any>;

interface WrenchContext<P = any> {
  internalContext: {
    component: React.ComponentType<P>;
    passed: {props: P};
  };
}

export class Wrench<P extends {} = {}> {
  interop: unknown[];
  inspections: Record<string, unknown>;
  steps: Step[];
  errors: any[];
  promises: Partial<MockedMethods>;
  initialStore: Partial<AppState>;
  PromiseQueue: Queue;

  public constructor(public context: WrenchContext) {
    jest.clearAllMocks(); // TODO: find a better place for this
    this.handleErrors();
    this.interop = [];
    this.inspections = {};
    this.steps = [];
    this.errors = [];
    this.promises = {};
    this.PromiseQueue = new Queue();
  }

  private handleErrors() {
    jest.spyOn(console, 'error').mockImplementation((...args) => void this.errors.push(args));
    jest.spyOn(console, 'warn').mockImplementation((...args) => void this.errors.push(args));
  }

  private assertErrors() {
    this.errors.forEach((err) => {
      throw new Error(err);
    });
  }

  applyWithAct(operations: (driver: this) => void) {
    this.steps.push(() => {
      act(() => void operations(this));
    });

    return this;
  }

  addSpies(...modules: (() => SpyModule)[]) {
    for (const module of modules) {
      this.interop.push(module());
    }
    return this;
  }

  getInterop() {
    const interopLog: {[key: string]: any} = {};
    this.interop.forEach((module) => {
      const key = Object.keys(module)[0];
      interopLog[key] = [...(interopLog[key] ?? []), module[key]].filter(Boolean);
    });
    return interopLog;
  }

  inspect(inspection: {[key: string]: Inspector<unknown>}) {
    this.steps.push((memory) => {
      for (const [key, assert] of Object.entries(inspection)) {
        this.inspections[key] = assert(memory);
      }
    });
    return this;
  }

  apply(operations: (driver: Wrench<P>) => void) {
    operations(this);
    return this;
  }

  press(testID: string, options?: MatchOptions) {
    this.steps.push(({locateAll}) => {
      const found = locateAll(testID, options);
      if (!(found?.getAttribute('disabled') === null)) throw new Error('Can`t press on disabled button.');
      found.click();
    });
    return this;
  }

  expectExists(testID: string) {
    this.steps.push(({locateAll}) => {
      locateAll(testID, {index: 0}); // fix silent TODO
    });
    return this;
  }

  inputText(testID: string, value: string | number) {
    this.steps.push(({locateAll}) => {
      const found = locateAll(testID);
      const stringified = String(value);
      fireEvent.change(found, {target: {value: stringified}});
    });
    return this;
  }

  selectOption(testID: string, value: string) {
    this.steps.push(({locateAll}) => {
      const found = locateAll(testID);
      fireEvent.change(found, {target: {value}});
    });
    return this;
  }

  toggle(testID: string, value: string) {
    this.steps.push(({locateAll}) => {
      const found = locateAll(testID);
      const radioNode = [...found.childNodes].find(({textContent}) => textContent === value);

      if (!radioNode) console.error(`Radio with value ${value} cannot be found.`);

      fireEvent.click(radioNode);
    });
    return this;
  }

  setStore(overrideStore: Partial<AppState>) {
    this.initialStore = overrideStore;
    return this;
  }

  private getMemory = (): Memory => {
    const {component, passed} = this.context.internalContext;
    const node = render(React.createElement(component, passed.props));
    const locateAll = (testID: Matcher, options?: MatchOptions) => {
      const index = options?.index ?? 0;
      const found = node.queryAllByTestId(testID);
      if (found.length > 1 && options?.index === undefined)
        throw new Error(`Multiple elements for testID={${testID}} were found.`);
      if (index > found.length) throw new Error(`Matching index out of range.`);
      if (!found.length) throw new Error(`Element with testID={${testID}} was not found.`);
      return found[index];
    };
    //@ts-ignore
    return {node, locateAll, externalContext: this.context.externalContext};
  };

  private addPromisesToQueue() {
    this.PromiseQueue.clear();
    Object.entries(this.promises).forEach(([methodName, query]) => {
      const responseData = query?.result;
      if (responseData) {
        this.PromiseQueue.enqueue({[methodName]: () => Promise.resolve(responseData)});
        this.PromiseQueue.log({[methodName]: query?.props});
      }
    });
  }

  private prepare() {
    this.addPromisesToQueue();

    const reduxStore = createMockedStore(this.initialStore, new MOCK(this.promises));
    this.context.externalContext.store = reduxStore;
    this.context.internalContext.store = reduxStore;
    this.context.internalContext.component = withStore(
      withModalContext(this.context.internalContext.component),
      reduxStore,
    );
  }

  resolve(promises: Record<string, any>) {
    this.promises = {...this.promises, ...promises}; //TODO use array instead so same queries with different args are supported
    this.steps.push(async () => {
      await act(async () => {
        Object.keys(promises).forEach((promise) => void this.PromiseQueue.dequeue(promise));
      });
    });
    return this;
  }

  withErrorBoundary() {
    const {component} = this.context.internalContext;
    this.context.internalContext.component = withErrorBoundary(component);
    return this;
  }

  private async then(resolve: (value: unknown) => Promise<never>, reject: (value: unknown) => Promise<never>) {
    try {
      this.prepare();
      const memory = this.getMemory();
      for (const step of this.steps) {
        await step(memory);
        this.assertErrors();
      }

      const promiseTasks = this.PromiseQueue.getTasks();
      const result = {...this.inspections, ...this.getInterop(), ...(promiseTasks.length ? {api: promiseTasks} : {})};
      return resolve(result);
    } catch (e) {
      this.assertErrors();
      return reject(e);
    }
  }
}

// export class withRedux {
//   constructor(public context: {store: Store<AppState>}) {}

//   withStore() {
//     const {component, store} = this.context.internalContext;
//     this.context.internalContext.component = withStore(component, store);
//     return this;
//   }

//   withModal() {
//     const {component} = this.context.internalContext;
//     this.context.internalContext.component = withModalContext(component);
//     return this;
//   }
// }

function createWrench<C, Args extends any[]>(modules: Constructor<C, Args>[]) {
  class Extended extends Mixin(Wrench).with(...modules) {
    constructor(args: WrenchContext & {externalContext: Args[number]}) {
      super(args);
    }
  }
  return Extended as MixinConstructors<Args, Constructor<C, Args>[]> & typeof Wrench;
}

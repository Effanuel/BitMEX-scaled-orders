import {EnhancedStore} from '@reduxjs/toolkit';
import {AppState} from 'redux/models/state';
import _ from 'lodash';
import {act} from 'react-test-renderer';
import {ButtonDriver} from 'components/Button/Button.driver';
import {createMockedStore} from '../mockStore';
import {COMPONENTS} from 'data-test-ids';
import {ReduxComponent, ReduxComponentDriver} from './drivers';
import SideRadioButtonsDriver from 'components/CustomRadioButton/SideRadioButtons.driver';
import InputFieldDriver from 'components/InputField/InputField.driver';
import {SelectDropdownDriver} from 'components/SelectDropdown/SelectDropdown.driver';
import {Inspector} from './inspectors';
import {SpyModule} from '../spies';
import {MockBitMEX_API} from 'tests/mockAPI';
import {Response} from 'tests/responses';

type Step = () => void | Promise<any>;

export class AppDriver<C extends ReduxComponent<C>> extends ReduxComponentDriver<C> {
  interop: unknown[];
  inspections: Record<string, unknown>;
  steps: Step[];
  constructor(component: C, state: EnhancedStore<AppState> = createMockedStore()) {
    super(component, state);
    this.interop = [];
    this.inspections = {};
    this.steps = [];
  }

  applyWithAct(operations: (driver: this) => void) {
    this.steps.push(() => {
      act(() => {
        operations(this);
      });
    });

    return this;
  }

  withStore(reducer: keyof AppState, parser?: string, as?: {as: string}) {
    this.steps.push(() => {
      const tree = this.store.getState()[reducer];
      this.inspections[as?.as ?? reducer] = parser ? collapseTree(tree, parser) : tree;
    });

    return this;
  }

  addFuel<K extends any[]>(...modules: SpyModule<K>[]) {
    for (const module of modules) {
      const [moduleName, {spy, parser}] = Object.entries(module)?.[0];
      spy.mockImplementation((...args: K) => {
        const value = parser?.(args) ?? args;
        this.interop.push({[moduleName]: value});
      });
    }

    return this;
  }

  getInterop() {
    const interopLog: {[key: string]: any} = {};
    this.interop.forEach((module: any) => {
      const key = Object.keys(module)[0];
      interopLog[key] = _.compact([...(interopLog[key] ?? []), module[key]]);
    });
    return interopLog;
  }

  getInspections() {
    return this.inspections;
  }

  inspect(inspection: {[key: string]: Inspector<any>}) {
    this.steps.push(() => {
      for (const [key, value] of Object.entries(inspection)) {
        this.inspections[key] = value(this);
      }
    });
    return this;
  }

  apply(operations: (driver: this) => void) {
    this.steps.push(() => {
      operations(this);
    });
    return this;
  }

  getInput(testID: string) {
    return new InputFieldDriver().attachTo(this.getElement(testID));
  }

  getButton(testID: string) {
    return new ButtonDriver().attachTo(this.getElement(testID));
  }

  press(testID: string) {
    this.steps.push(() => {
      this.getButton(testID).pressButton();
    });
    return this;
  }

  inputText(testID: string, value: string) {
    this.getInput(testID).setInputValue(value);
    return this;
  }

  selectOption(option: string) {
    this.getDropdown().selectOption(option);
    return this;
  }

  burnFuel() {
    this.steps.push(async () => {
      await act(flushPromises);
    });
    return this;
  }

  async halt() {
    for (const step of this.steps) {
      await step();
    }
    const reduxActions = {actions: this.getActionTypes()};

    return {...this.getInspections(), ...this.getInterop(), ...reduxActions};
  }

  getDropdown() {
    return new SelectDropdownDriver().attachTo(this.getElement(COMPONENTS.SELECT_DROPDOWN));
  }

  getRadioButtons(testID: string) {
    return new SideRadioButtonsDriver().attachTo(this.getElement(testID));
  }
}

interface Engine {
  store?: Partial<AppState>;
  mocks?: Response[];
}

export function createEngine(component: any, initialStore?: Partial<AppState>, initialMocks?: Response) {
  return ({store, mocks}: Partial<Engine> = {}) => {
    const redux = store ? store : initialStore;
    const reduxStore = createMockedStore(redux, new MockBitMEX_API({...(initialMocks ?? {}), ...(mocks ?? {})}));
    return new AppDriver(component, reduxStore);
  };
}

function collapseTree(tree: unknown, parser?: string) {
  let accumulator: any = tree;

  parser?.split('.').forEach((access) => {
    const accessByKey = /^\w+$/g.test(access);
    const accessByMap = /\[\]{\w+,\w+}/g.test(access);
    if (accessByKey) {
      accumulator = accumulator[access];
    } else if (accessByMap) {
      accumulator = accumulator.map((item: any) => _.pick(item, access.match(/\w+/g) ?? []));
    }
  });
  return accumulator;
}

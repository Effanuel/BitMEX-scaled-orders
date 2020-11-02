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

export class AppDriver<C extends ReduxComponent<C>> extends ReduxComponentDriver<C> {
  interop: unknown[];
  inspections: Record<string, unknown>;
  constructor(component: C, state: EnhancedStore<AppState> = createMockedStore()) {
    super(component, state);
    this.interop = [];
    this.inspections = {};
  }

  addModules<K extends any[]>(...modules: SpyModule<K>[]) {
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

  inspect<T>(inspection: {[key: string]: Inspector<T>}) {
    for (const [key, value] of Object.entries(inspection)) {
      this.inspections[key] = value(this);
    }
    return this;
  }

  apply(operations: (driver: this) => void) {
    operations(this);
    return this;
  }

  getInput(testID: string) {
    return new InputFieldDriver().attachTo(this.getElement(testID));
  }

  getButton(testID: string) {
    return new ButtonDriver().attachTo(this.getElement(testID));
  }

  press(testID: string) {
    this.getButton(testID).pressButton();
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

  async burnFuel() {
    await act(flushPromises);
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
  store?: EnhancedStore<AppState>;
}

export function createEngine(component: any, initialStore?: EnhancedStore<AppState>) {
  return ({store}: Partial<Engine> = {}) => {
    const reduxStore = store ? store : initialStore;
    return new AppDriver(component, reduxStore);
  };
}

import {EnhancedStore} from '@reduxjs/toolkit';
import {ButtonDriver} from 'components/Button/Button.driver';
import InputFieldDriver from 'components/InputField/InputField.driver';
import {SelectDropdownDriver} from 'components/SelectDropdown/SelectDropdown.driver';
import {COMPONENTS} from 'data-test-ids';
import {AppState} from 'redux/models/state';
import {ReduxComponent, ReduxComponentDriver} from './drivers';
import {createMockedStore} from './mockStore';

export class AppDriver<C extends ReduxComponent<C>> extends ReduxComponentDriver<C> {
  constructor(component: C, state: EnhancedStore<AppState> = createMockedStore()) {
    super(component, state);
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

  getDropdown() {
    return new SelectDropdownDriver().attachTo(this.getElement(COMPONENTS.SELECT_DROPDOWN));
  }
}

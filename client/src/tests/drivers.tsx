import React from 'react';
import {ComponentDriver as ReactComponentDriver, getTextNodes} from 'react-component-driver';
import {Store, EnhancedStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {AppState} from 'redux/models/state';
import {toast} from 'react-toastify';

type InferProps<T> = T extends React.ComponentType<infer Props> ? Props : never;
export type ReduxComponent<T> = React.ComponentType<Readonly<InferProps<T>>>;

export function withStore<C extends ReduxComponent<C>, S, A extends Action<any>>(
  WrappedComponent: ReduxComponent<C>,
  store: Store<S, A>,
) {
  class WithStore extends React.PureComponent<InferProps<C>> {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  }

  return hoistNonReactStatics(WithStore, WrappedComponent) as C;
}

export class ComponentDriver<Props> extends ReactComponentDriver<Props> {
  constructor(component: React.ComponentType<Props>) {
    super(component);
  }

  getElement(testID = '...') {
    const element = this.getByID(testID);

    if (element) {
      return element;
    }

    throw new Error(`Cannot find element with testID: ${testID}.`);
  }

  getText(testID: string) {
    return getTextNodes(this.getElement(testID)).join('');
  }
}

export class ReduxComponentDriver<C extends ReduxComponent<C>> extends ComponentDriver<InferProps<C>> {
  store: EnhancedStore<AppState> & {getActions: []};
  toasts: any;
  constructor(component: C, store: any) {
    super(withStore(component, store));
    this.store = store;
    this.toasts = [];
    (toast as any).mockImplementation((val: any) => this.toasts.push(val.props));
  }

  getActionTypes() {
    return (this.store as any).getActions().map((action: any) => action.type);
  }

  getToastCalls() {
    return {toasts: this.toasts};
  }
}

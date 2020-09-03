import React from 'react';
import {ComponentDriver as ReactComponentDriver, getTextNodes} from 'react-component-driver';
import {Store, EnhancedStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {AppState, createStore} from 'redux/store';

export class ComponentDriver<Props> extends ReactComponentDriver<Props> {
  constructor(component: React.ComponentType<Props>) {
    super(component);
  }

  getElement(testID: string | undefined) {
    const element = this.getByID(testID!);

    if (element) {
      return element;
    }

    throw new Error(`Cannot find element with testID: ${testID}.`);
  }

  getText(testID: string) {
    return getTextNodes(this.getElement(testID)).join('');
  }
}

type InferProps<T> = T extends React.ComponentType<infer Props> ? Props : never;
type ReduxComponent<T> = React.ComponentType<Readonly<InferProps<T>>>;

export function withStore<C extends ReduxComponent<C>, S, A extends Action<any>>(
  WrappedComponent: C,
  store: Store<S, A>,
) {
  const TypeAdjustedWrappedComponent = WrappedComponent as ReduxComponent<C>;

  class WithStore extends React.PureComponent<InferProps<C>> {
    render() {
      return (
        <Provider store={store}>
          <TypeAdjustedWrappedComponent {...this.props} />
        </Provider>
      );
    }
  }

  return hoistNonReactStatics(WithStore, WrappedComponent) as C;
}

export class ReduxComponentDriver<C extends ReduxComponent<C>> extends ComponentDriver<InferProps<C>> {
  store: EnhancedStore<AppState>;
  constructor(component: C, store = createStore()) {
    super(withStore(component, store));
    this.store = store;
  }
}

import React from 'react';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {ModalProvider} from 'context/modal-context';

class ErrorBoundary<P> extends React.Component<P, {hasError: boolean}> {
  constructor(props: P) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: {name: string; message: string}) {
    return {hasError: true};
  }

  componentDidCatch(error: {name: string; message: string}, errorInfo: any) {
    if (/could not find react-redux context value;/g.test(error.message)) {
      console.log('Call withStore(), before rendering to provide redux store');
      return;
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export type InferProps<T> = T extends React.ComponentType<infer Props> ? Props : never;
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

export function withErrorBoundary<C extends React.ComponentType<Readonly<InferProps<C>>>>(
  WrappedComponent: React.ComponentType<Readonly<InferProps<C>>>,
) {
  class WithErrorBoundary extends React.PureComponent<InferProps<C>> {
    render() {
      return (
        <ErrorBoundary>
          <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  }

  return hoistNonReactStatics(WithErrorBoundary, WrappedComponent) as C;
}

export function withModalContext<C extends ReduxComponent<C>>(WrappedComponent: ReduxComponent<C>) {
  class WithStore extends React.PureComponent<InferProps<C>> {
    render() {
      return (
        <ModalProvider>
          <WrappedComponent {...this.props} />
        </ModalProvider>
      );
    }
  }

  return hoistNonReactStatics(WithStore, WrappedComponent) as C;
}

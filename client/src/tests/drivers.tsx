import {hocFacade} from 'influnt';
import React from 'react';
import {Provider} from 'react-redux';
import {ModalProvider} from 'context/modal-context';
import {ChakraProvider} from '@chakra-ui/react';
import {MockedStore} from './mockStore';

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
    }
  }

  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}

export const withStore = (store: MockedStore) =>
  hocFacade({
    providers: [
      ErrorBoundary, //
      [Provider, {props: {store}}],
      ChakraProvider,
      ModalProvider,
    ],
  });

export const componentContext = () => hocFacade({providers: [ChakraProvider]});

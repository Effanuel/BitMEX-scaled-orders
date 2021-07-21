import {hocFacade} from 'influnt';
import {Provider} from 'react-redux';
import {ModalProvider} from 'context/modal-context';
import {ChakraProvider} from '@chakra-ui/react';
import {MockedStore} from './mockStore';

export const withStore = (store: MockedStore) =>
  hocFacade({
    providers: [
      [Provider, {props: {store}}], //
      ChakraProvider,
      ModalProvider,
    ],
  });

export const componentContext = () => hocFacade({providers: [ChakraProvider]});

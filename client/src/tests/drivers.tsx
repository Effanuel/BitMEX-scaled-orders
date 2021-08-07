import {hocFacade} from 'influnt';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {ModalProvider} from 'context/modal-context';
import {MockedStore} from './mockStore';

export const withStore = (store: MockedStore) =>
  hocFacade({
    providers: [
      [Provider, {props: {store}}], //
      MemoryRouter,
      ChakraProvider,
      ModalProvider,
    ],
  });

export const componentContext = () => hocFacade({providers: [ChakraProvider]});

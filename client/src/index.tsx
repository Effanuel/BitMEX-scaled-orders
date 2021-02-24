import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {ModalProvider} from 'context/modal-context';

const theme = extendTheme({
  textStyles: {
    bold: {
      fontWeight: '900',
      fontSize: '16px',
      lineHeight: 1,
    },
    red: {
      color: 'rgb(245, 157, 172)',
      _hover: {color: '#cf6679', cursor: 'pointer'},
      _disabled: {color: 'rgba(255, 255, 255, 0.6)'},
    },
    regular: {
      color: '#4caf50',
      _hover: {color: '#41e87a', cursor: 'pointer'},
      _disabled: {color: 'rgba(255, 255, 255, 0.6)', cursor: 'default'},
    },
    hover: {
      _hover: {cursor: 'pointer'},
    },
    'hover:red:border': {
      _hover: {
        boxShadow: 'inset 0px 0px 0px 1px red',
        cursor: 'pointer',
      },
    },
    'hover:red:color': {
      _hover: {
        color: '#f00',
        cursor: 'pointer',
      },
    },
  },
  colors: {
    white: '#e0f2f1',
    red: '#cf6679',
    green: '#4caf50',
    brand: {
      100: '#121212',
    },
  },
  components: {
    Table: {
      variants: {
        striped: {
          th: {
            fontSize: 10,
            color: 'white',
          },
          td: {
            color: 'white',
            fontWeight: 500,
          },
        },
      },
      defaultProps: {
        colorScheme: 'brand',
        size: 'sm',
        variant: 'striped',
      },
    },
    // Th: {
    //   sizes: {
    //     sm: {
    //       color: 'red',
    //     },
    //   },
    //   baseStyle: {
    //     textColor: 'white',
    //     color: 'white',
    //   },
    //   defaultProps: {
    //     color: 'white',
    //   },
    // },
  },
});

ReactDOM.render(
  <Provider store={createStore()}>
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.unregister();

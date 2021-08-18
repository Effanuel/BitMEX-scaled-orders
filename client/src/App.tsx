import React from 'react';
import {Box} from '@chakra-ui/react';
import {Route, Switch} from 'react-router-dom';
import Home from 'pages/Home';
import Settings from 'pages/Settings';
import {ExchangeRoute, Header} from 'components';
import {Exchange} from 'redux/modules/settings/types';
import BitmexExchange from 'pages/Bitmex';
import {RoutePath} from 'pages/paths';

import 'scss/root.module.scss';

export default React.memo(function App() {
  return (
    <>
      <Header />
      <Box maxWidth="720px" margin="auto" minWidth="720px">
        <Switch>
          <Route path={RoutePath.Home} exact>
            <Home />
          </Route>
          <ExchangeRoute path={RoutePath.BitMex} exchange={Exchange.BitMeX}>
            <BitmexExchange />
          </ExchangeRoute>
          <ExchangeRoute path={RoutePath.BitmexTest} exchange={Exchange.BitMeXTEST}>
            <BitmexExchange />
          </ExchangeRoute>
          <Route path={RoutePath.Settings}>
            <Settings />
          </Route>
        </Switch>
      </Box>
    </>
  );
});

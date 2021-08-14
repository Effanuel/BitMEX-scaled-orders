import React from 'react';
import {Box} from '@chakra-ui/react';
import {Route, Switch} from 'react-router-dom';
import Home from 'pages/Home';
import Settings from 'pages/Settings';
import {Header} from 'components';
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
          <Route path={RoutePath.BitMex}>
            <BitmexExchange />
          </Route>
          <Route path={RoutePath.BitmexTest}>
            <BitmexExchange />
          </Route>
          <Route path={RoutePath.Settings}>
            <Settings />
          </Route>
        </Switch>
      </Box>
    </>
  );
});

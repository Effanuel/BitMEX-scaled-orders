import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from 'pages/Home';
import Settings from 'pages/Settings';
import {Header} from 'components';
import BitmexExchange from 'pages/Bitmex';

import 'scss/root.module.scss';
import {RoutePath} from 'pages/paths';

export default React.memo(function App() {
  return (
    <>
      <Header />
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
    </>
  );
});

import React from 'react';
import {useSelector} from 'react-redux';
import {Route} from 'react-router-dom';
import {activateExchange} from 'redux/modules/settings/settingsModule';
import {Exchange} from 'redux/modules/settings/types';
import {AppState} from 'redux/modules/state';
import {useAppDispatch} from 'redux/store';

interface Props {
  path: string;
  exact?: boolean;
  exchange: Exchange;
  children: React.ReactNode;
}

export function ExchangeRoute({path, exact, exchange, children}: Props) {
  const dispatch = useAppDispatch();

  const currentExchange = useSelector((state: AppState) => state.settings.activeExchange);

  React.useEffect(() => {
    dispatch(activateExchange(exchange));
  }, [dispatch, exchange]);

  return (
    <Route path={path} exact={exact}>
      {currentExchange === exchange ? children : null}
    </Route>
  );
}

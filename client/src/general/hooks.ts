import React from 'react';
import {ModalContext} from 'context/modal-context';
import {useLocation} from 'react-router-dom';
import {Exchange} from 'redux/modules/settings/types';
import {useDispatch} from 'react-redux';
import * as ordersModule from 'redux/modules/orders/ordersModule';
import * as previewModule from 'redux/modules/preview/previewModule';
import * as trailingModule from 'redux/modules/trailing/trailingModule';
import * as crossModule from 'redux/modules/cross/crossModule';

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error('Modal context: add wrapper');
  return context;
}

export function useExchange(): Exchange {
  const location = useLocation();
  return location.pathname.slice(1) as Exchange;
}

type ReduxModules = typeof modules;

const modules = {...ordersModule, ...previewModule, ...trailingModule, ...crossModule};

type ApiActions = {
  [key in keyof ReduxModules]: (
    params: ReduxModules[key] extends (...args: any) => any
      ? Omit<Parameters<ReduxModules[key]>[number], 'exchange'> extends {exchange?: Exchange}
        ? void
        : Omit<Parameters<ReduxModules[key]>[number], 'exchange'>
      : void,
  ) => void;
};

export function useApi(): ApiActions {
  const dispatch = useDispatch();
  const exchange = useExchange();
  //@ts-ignore
  return React.useMemo(
    () =>
      new Proxy(modules, {
        get: (target: ReduxModules, key: keyof ReduxModules) => {
          if (typeof target[key] === 'function') {
            return (params: any) => {
              //@ts-ignore
              dispatch(target[key]({exchange, ...params}));
            };
          }
          return undefined;
        },
      }),
    [dispatch, exchange],
  );
}

import React from 'react';
import {ModalContext} from 'context/modal-context';
import {useLocation} from 'react-router-dom';
import {Exchange} from 'redux/modules/settings/types';
import {useSelector} from 'react-redux';
import {AppState} from 'redux/modules/state';
import {AppContext} from 'context/app-context';

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error('Modal context: add wrapper');
  return context;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('App context: add wrapper');
  return context;
}

export function useExchange(): Exchange {
  const location = useLocation();
  return location.pathname.slice(1) as Exchange;
}

export function useIsApiKeyActive(): boolean {
  const activeApiKeys = useSelector((state: AppState) => state.settings.activeApiKeys);
  const activeExchange = useSelector((state: AppState) => state.settings.activeExchange);
  return Boolean(activeExchange && (activeApiKeys?.[activeExchange] ?? false));
}

import {AnyAction, Dispatch, Middleware} from '@reduxjs/toolkit';
import {AppState} from 'redux/models/state';
import {registeredToasts} from './registerToasts';

const middleware: Middleware<obj, AppState, Dispatch<AnyAction>> = (store) => (next) => (action: Action) => {
  registeredToasts[action.type]?.(action);
  next(action);
};

export default middleware;

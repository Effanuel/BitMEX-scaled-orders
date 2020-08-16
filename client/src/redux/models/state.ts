import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {AppState} from 'redux/store';

export type Thunk = ThunkAction<void, AppState, undefined, Action<string>>;

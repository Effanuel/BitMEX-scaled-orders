import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {PreviewState} from 'redux/modules/preview/types';
import {TrailingState} from 'redux/modules/trailing/types';
import {WebsocketState} from 'redux/modules/websocket/types';
import {CrossState} from 'redux/modules/cross/types';

export type Thunk = ThunkAction<void, AppState, undefined, Action<string>>;

export interface AppState {
  preview: PreviewState;
  websocket: WebsocketState;
  trailing: TrailingState;
  cross: CrossState;
}

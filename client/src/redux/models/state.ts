import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

import {PreviewState} from '../modules/preview/types';
import {WebsocketState} from '../modules/websocket/types';
import {BestPriceState} from '../modules/best-price/types';
import {NotifyState} from '../modules/notify/types';

export type Thunk = ThunkAction<void, AppState, undefined, Action<string>>;

export interface AppState {
  preview: PreviewState;
  websocket: WebsocketState;
  best_price: BestPriceState;
  notify: NotifyState;
}

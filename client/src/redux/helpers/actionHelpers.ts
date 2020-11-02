import {
  ActionCreatorWithPreparedPayload,
  ActionCreatorWithoutPayload,
  createAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';
import {AppState} from 'redux/models/state';
import {ACTIONS_cross} from 'redux/modules/cross/types';
import {ACTIONS_preview, API_ACTIONS_preview} from 'redux/modules/preview/types';
import {ACTIONS_trailing} from 'redux/modules/trailing/types';
import type {BitMEX} from './apiHelpers';

export const withPayloadType = <T>() => (payload: T) => ({payload});

const actions = [...ACTIONS_preview, ...ACTIONS_trailing, ...ACTIONS_cross] as const;
const apiActions = [...API_ACTIONS_preview] as const;

type ActionMapKey = typeof actions[number];
type ApiActionMapKey = typeof apiActions;

type ActionMap<P> = {
  [key in ActionMapKey]: [P] extends [never]
    ? ActionCreatorWithoutPayload<ActionMapKey>
    : ActionCreatorWithPreparedPayload<[P], P, ActionMapKey>;
};

export interface ThunkApiConfig {
  rejected: string;
  extra: BitMEX;
  rejectValue: string;
  state: AppState;
}

export function createThunk<P, Returned = any>(
  actionName: ActionMapKey,
  apiMethod: keyof BitMEX,
  moreData = {},
): AsyncThunk<Returned, P, ThunkApiConfig> {
  return createAsyncThunk(actionName, async (payload: P, {rejectWithValue, extra: API}) => {
    try {
      // TODO: add a proper type
      //@ts-ignore
      const response = await API[apiMethod](payload);
      return {...response, ...moreData};
    } catch (err) {
      return rejectWithValue(formatErrorMessage(err));
    }
  });
}

export function formatErrorMessage(err: any): string {
  return err.message?.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
}

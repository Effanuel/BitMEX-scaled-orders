import {
  ActionCreatorWithPreparedPayload,
  ActionCreatorWithoutPayload,
  createAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';
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

interface ThunkApiConfig {
  rejected: string;
  extra: BitMEX;
  rejectValue: string;
}

export function createThunk<P, Returned = any>(
  actionName: ActionMapKey,
  apiMethod: keyof BitMEX,
  moreData = {},
): AsyncThunk<Returned, P, ThunkApiConfig> {
  return createAsyncThunk<Returned, P, ThunkApiConfig>(
    actionName,
    async (payload: P, {rejectWithValue, extra: API}) => {
      try {
        // TODO: add a proper type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //@ts-ignore
        const response = await API[apiMethod](payload);
        return {...response, ...moreData};
      } catch (err) {
        const payload: string = err.message?.includes('500')
          ? 'Server is offline'
          : err.response?.data?.error || 'error';
        return rejectWithValue(payload);
      }
    },
  );
}

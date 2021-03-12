import {createAsyncThunk, AsyncThunk, Dispatch} from '@reduxjs/toolkit';
import parseAPIResponse from 'redux/api/parseAPIResponse';
import {API, APIType} from 'redux/api/api';
import {AppState} from 'redux/models/state';

import {ACTIONS_cross} from 'redux/modules/cross/types';
import {ACTIONS_orders} from 'redux/modules/orders/types';
import {ACTIONS_preview} from 'redux/modules/preview/types';
import {ACTIONS_trailing} from 'redux/modules/trailing/types';

export const withPayloadType = <T>() => (payload: T) => ({payload});

const reducerActions = [...ACTIONS_preview, ...ACTIONS_trailing, ...ACTIONS_cross, ...ACTIONS_orders];

type ThunkActionNames = typeof reducerActions[number];

export interface ThunkApiConfig {
  rejected: string;
  extra: API;
  dispatch: Dispatch;
  rejectValue: string;
  state: AppState;
}

type AdaptPayload<P> = (props: {payload: P; getState: () => AppState}) => P;

export function createThunk<K extends keyof APIType, P extends Parameters<APIType[K]>[number]>(
  actionName: ThunkActionNames,
  apiMethod: K,
  payloadToReturn?: keyof P,
  adaptPayload?: AdaptPayload<P>, // TODO: fix conditional type
  // TODO: add handling of never
  //AdaptPayload<P> extends undefined ? P : P
): AsyncThunk<any, P, ThunkApiConfig> {
  //@ts-ignore
  return createAsyncThunk(actionName, async (payload: P, {extra: API, rejectWithValue, getState}) => {
    try {
      const adaptedPayload = adaptPayload?.({payload, getState}) ?? payload;
      // TODO: add a proper type, there may not fix a fix for this tho
      //@ts-expect-error
      const {data} = await API[apiMethod](adaptedPayload);
      const responseData = {data: parseAPIResponse(apiMethod)(data), statusCode: data.statusCode};
      const extraData = payloadToReturn ? {[payloadToReturn]: payload[payloadToReturn]} : {};
      return {...responseData, ...extraData};
    } catch (err) {
      console.log('ERR, ', err);
      return rejectWithValue(formatErrorMessage(err));
    }
  });
}

function formatErrorMessage(err: any): string {
  return err?.message?.includes('500') ? 'Server is offline' : err?.response?.data?.error || 'error';
}

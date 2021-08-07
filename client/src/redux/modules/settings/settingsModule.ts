import {createReducer} from '@reduxjs/toolkit';
import {createBasicThunk} from 'redux/helpers/actionHelpers';
import {
  DELETE_ALL_API_KEYS,
  DELETE_API_KEY,
  Exchange,
  GET_ALL_API_KEYS,
  GET_API_KEY,
  SAVE_API_KEY,
  SettingsState,
} from './types';

type SaveApiKeyRequest = {exchange: Exchange; key: string; secret: string};
type SaveApiKeyResponse = {exchange: Exchange};
export const saveApiKey = createBasicThunk<SaveApiKeyRequest, SaveApiKeyResponse>({
  actionName: SAVE_API_KEY,
  method: 'POST',
  url: '/settings/apiKey',
});

type GetApiKeyRequest = {exchange: Exchange};
type GetApiKeyResponse = {exchange: Exchange; key: string; secret: string};
export const getApiKey = createBasicThunk<GetApiKeyRequest, GetApiKeyResponse>({
  actionName: GET_API_KEY,
  method: 'GET',
  url: '/settings/apiKey',
});

type GetAllApiKeysResponse = {exchanges: Exchange[]};
export const getAllApiKeys = createBasicThunk<void, GetAllApiKeysResponse>({
  actionName: GET_ALL_API_KEYS,
  method: 'GET',
  url: '/settings/apiKeys',
});

type DeleteApiKeyRequest = Exchange;
type DeleteApiKeyResponse = Exchange;
export const deleteApiKey = createBasicThunk<DeleteApiKeyRequest, DeleteApiKeyResponse>({
  actionName: DELETE_API_KEY,
  method: 'DELETE',
  url: '/settings/apiKey',
});

export const deleteAllApiKeys = createBasicThunk<void, {}>({
  actionName: DELETE_ALL_API_KEYS,
  method: 'DELETE',
  url: '/settings/apiKeys',
});

export const defaultState: SettingsState = {
  activeApiKeys: {bitmex: false, bitmexTEST: false},
  settingsLoading: false,
  settingsError: '',
};

export const settingsReducer = createReducer<SettingsState>(defaultState, (builder) =>
  builder
    .addCase(saveApiKey.pending, (state) => {
      state.settingsError = '';
      state.settingsLoading = true;
    })
    .addCase(saveApiKey.fulfilled, (state, {payload}) => {
      state.settingsError = '';
      state.settingsLoading = false;
      state.activeApiKeys = {...state.activeApiKeys, [payload.exchange]: true};
    })
    .addCase(getApiKey.fulfilled, (state, {payload}) => {
      console.log(payload);
      return state;
    })
    .addCase(getAllApiKeys.fulfilled, (state, {payload}) => {
      payload.exchanges.forEach((exchange) => void (state.activeApiKeys[exchange] = true));
    })
    .addCase(deleteAllApiKeys.fulfilled, () => defaultState)
    .addCase(deleteApiKey.fulfilled, (state, {payload}) => {
      state.settingsError = '';
      state.settingsLoading = false;
      state.activeApiKeys = {...state.activeApiKeys, [payload]: true};
    }),
);

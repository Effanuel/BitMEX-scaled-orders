import {createReducer} from '@reduxjs/toolkit';
import {createBasicThunk} from 'redux/helpers/actionHelpers';
import {DELETE_ALL_API_KEYS, DELETE_API_KEY, GET_ALL_API_KEYS, GET_API_KEY, SAVE_API_KEY, SettingsState} from './types';

export const saveApiKey = createBasicThunk({actionName: SAVE_API_KEY, method: 'saveApiKey'});

export const getApiKey = createBasicThunk({actionName: GET_API_KEY, method: 'getApiKey'});

export const getAllApiKeys = createBasicThunk({actionName: GET_ALL_API_KEYS, method: 'getAllApiKeys'});

export const deleteApiKey = createBasicThunk({actionName: DELETE_API_KEY, method: 'deleteApiKey'});

export const deleteAllApiKeys = createBasicThunk({actionName: DELETE_ALL_API_KEYS, method: 'deleteAllApiKeys'});

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
      console.log('FULL; FILLED', payload);
      state.settingsError = '';
      state.settingsLoading = false;
      state.activeApiKeys[payload.exchange] = true;
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
      state.activeApiKeys[payload] = false;
    }),
);

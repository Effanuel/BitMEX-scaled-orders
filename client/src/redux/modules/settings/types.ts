export const SAVE_API_KEY = 'settings/SAVE_API_KEY';
export const GET_API_KEY = 'settings/GET_API_KEY';
export const GET_ALL_API_KEYS = 'settings/GET_ALL_API_KEYS';
export const DELETE_API_KEY = 'settings/DELETE_API_KEY';
export const DELETE_ALL_API_KEYS = 'settings/DELETE_ALL_API_KEYS';

export enum Exchange {
  BitMeX = 'bitmex',
  BitMeXTEST = 'bitmexTEST',
}

export interface SettingsState {
  activeApiKeys: Record<Exchange, boolean>;
  settingsLoading: boolean;
  settingsError: string;
}

export const ACTIONS_settings = [
  SAVE_API_KEY,
  GET_API_KEY,
  GET_ALL_API_KEYS,
  DELETE_API_KEY,
  DELETE_ALL_API_KEYS,
] as const;

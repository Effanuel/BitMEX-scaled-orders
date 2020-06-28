import axios from 'axios';
import * as _ from 'lodash/fp';
import {Thunk} from 'redux/models/state';

type ActionMap = {[key: string]: string};

export const REQUEST: ActionMap = {};
export const SUCCESS: ActionMap = {};
export const FAILURE: ActionMap = {};

export function registerApiActions(...names: string[]) {
  names.forEach((name) => {
    REQUEST[name] = `${name}_REQUEST`;
    SUCCESS[name] = `${name}_SUCCESS`;
    FAILURE[name] = `${name}_FAILURE`;
  });
}

export const callAPI = <P>(actionName: string, payload: P, path: string, ...args: string[]): Thunk => async (
  dispatch,
) => {
  try {
    dispatch({type: REQUEST[actionName]});
    const response = await axios.post(path, payload);
    const {data, success} = response.data;

    const extraData = _.pick([...args, 'text'], JSON.parse(data));

    dispatch({type: SUCCESS[actionName], payload: {success, from: 'Scaled_orders', ...extraData}});
  } catch (err) {
    const payload = err.message?.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch({type: FAILURE[actionName], payload});
  }
};

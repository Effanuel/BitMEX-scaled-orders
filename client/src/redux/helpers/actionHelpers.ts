import axios from 'axios';
import * as _ from 'lodash/fp';
import {Thunk} from 'redux/models/state';
import {preview_apiActions} from 'redux/modules/preview/types';
import {best_price_apiActions} from 'redux/modules/best-price/types';

const apiActions = [...preview_apiActions, ...best_price_apiActions] as const;

type ActionMapKey = typeof apiActions[number];

type ActionMap = {[key in ActionMapKey]: string};

const getApiActions = (actions: typeof apiActions) => ({
  apiRequestActions: actions.map((name) => ({
    [name]: `${name}_REQUEST`,
  })),
  apiSuccessActions: actions.map((name) => ({
    [name]: `${name}_SUCCESS`,
  })),
  apiFailureActions: actions.map((name) => ({
    [name]: `${name}_FAILURE`,
  })),
});

export const REQUEST: ActionMap = Object.assign({}, ...getApiActions(apiActions).apiRequestActions);
export const SUCCESS: ActionMap = Object.assign({}, ...getApiActions(apiActions).apiSuccessActions);
export const FAILURE: ActionMap = Object.assign({}, ...getApiActions(apiActions).apiFailureActions);

export const callAPI = <P>(actionName: ActionMapKey, payload: P, path: string, ...args: string[]): Thunk => async (
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

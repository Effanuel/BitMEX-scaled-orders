import {createAction, ActionCreatorWithPreparedPayload, ActionCreatorWithoutPayload} from '@reduxjs/toolkit';
import _ from 'lodash/fp';
import {Thunk} from 'redux/models/state';
import {ACTIONS_preview, API_ACTIONS_preview} from 'redux/modules/preview/types';
import {ACTIONS_trailing, POST_TRAILING_ORDER} from 'redux/modules/trailing/types';

export const withPayloadType = <T>() => (payload: T) => ({payload});

const actions = [...ACTIONS_preview, ...ACTIONS_trailing] as const;
const apiActions = [...API_ACTIONS_preview] as const;

type ActionMapKey = typeof actions[number];
type ApiActionMapKey = typeof apiActions;

type ActionMap<P> = {
  [key in ActionMapKey]: [P] extends [never]
    ? ActionCreatorWithoutPayload<ActionMapKey>
    : ActionCreatorWithPreparedPayload<[P], P, ActionMapKey>;
};

const registerAndGetActions = (actionsToCreate: typeof actions) => ({
  apiRequestActions: actionsToCreate.map((name) => ({
    [name]: createAction(`${name}_REQUEST`),
  })) as ActionMap<never>[],
  apiSuccessActions: actionsToCreate.map((name) => ({
    [name]: createAction(`${name}_SUCCESS`, withPayloadType<any>()),
  })),
  apiFailureActions: actionsToCreate.map((name) => ({
    [name]: createAction(`${name}_FAILURE`, withPayloadType<string>()),
  })) as ActionMap<string>[],
});

const registeredActions = registerAndGetActions(actions);
export const REQUEST: ActionMap<never> = Object.assign({}, ...registeredActions.apiRequestActions);
export const SUCCESS: ActionMap<any> = Object.assign({}, ...registeredActions.apiSuccessActions);
export const FAILURE: ActionMap<string> = Object.assign({}, ...registeredActions.apiFailureActions);

export const callAPI = <M extends (payload: P) => any, P>(
  actionName: ActionMapKey,
  apiMethod: M,
  apiPayload: P,
  moreData = {},
): Thunk => async (dispatch) => {
  console.log('SEN', actionName);
  try {
    console.log('DISPATCH REQUEST');
    dispatch(REQUEST[actionName]());

    const data = await apiMethod(apiPayload);
    const payload = {...data, ...moreData};
    console.log('DISPATCH AFTER SEND API', payload);

    dispatch(SUCCESS[actionName](payload));
  } catch (err) {
    console.log('err: ', err);
    const payload: string = err.message?.includes('500') ? 'Server is offline' : err.response?.data?.error || 'error';
    dispatch(FAILURE[actionName](payload));
  }
};

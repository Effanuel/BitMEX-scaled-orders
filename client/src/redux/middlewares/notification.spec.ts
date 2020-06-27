import configureStore from 'redux-mock-store';

import notificationMiddleware, {notificationMessage} from './notification';
import {FAILURE, SUCCESS, REQUEST} from 'redux/helpers/actionHelpers';
import {PREVIEW_POST_ORDER} from 'redux/modules/preview/types';
import {BEST_POST_ORDER} from 'redux/modules/best-price/types';

const middlewares = [notificationMiddleware];
const mockStore = configureStore(middlewares);

const previewPostOrderSuccess = (payload: any) => ({type: SUCCESS[PREVIEW_POST_ORDER], payload});
const previewPostOrderFailure = (payload: any) => ({type: FAILURE[PREVIEW_POST_ORDER], payload});

const bestPostOrderSuccess = (payload: any) => ({type: SUCCESS[BEST_POST_ORDER], payload});
const bestPostOrderFailure = (payload: any) => ({type: FAILURE[BEST_POST_ORDER], payload});

describe('notification middleware', () => {
  const initialStore = {};
  let store: any;
  beforeEach(() => {
    store = mockStore(initialStore);
  });

  const payloadSuccess = {
    success: 200,
    text: 'Hello',
    from: 'ScaledOrders',
  };

  it('should dispatch notify action for success actions', () => {
    store.dispatch(bestPostOrderSuccess(payloadSuccess));
    const expectedActions = [
      {
        payload: {message: payloadSuccess.from, type: 'success'},
        type: 'notify/MESSAGE',
      },
      {
        payload: {...payloadSuccess},
        type: 'best_price/BEST_POST_ORDER_SUCCESS',
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toHaveLength(2);
  });

  it('should dispatch notify action for error actions', () => {
    const payloadError = {
      message: 'Hello',
      type: 'error',
    };
    store.dispatch(previewPostOrderFailure(payloadError));
    const expectedActions = [
      {
        payload: {message: payloadError.message, type: 'error'},
        type: 'notify/MESSAGE',
      },
      {
        payload: {...payloadError},
        type: 'preview/POST_ORDER_FAILURE',
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toHaveLength(2);
  });

  it('should not dispatch notify action for non success actions', () => {
    store.dispatch({type: REQUEST[PREVIEW_POST_ORDER], payload: {}});

    expect(store.getActions()).toHaveLength(1);
  });
});

describe('notificationMessage()', () => {
  describe('notificationMessage(...) skipped actions', () => {
    const payload = {
      message: 'Hello',
      type: 'error',
    };
    let action, message;

    it('returns empty message and type fields for non SUCCESS and non ERROR actions', () => {
      action = {type: REQUEST[PREVIEW_POST_ORDER], payload: {}};
      message = notificationMessage(action);
      expect(message).toEqual({message: '', type: ''});
    });

    it('returns the same message and type passed for ..._ERROR dispatched actions', () => {
      action = previewPostOrderFailure(payload);
      message = notificationMessage(action);
      expect(message).toEqual(payload);

      action = bestPostOrderFailure(payload);
      message = notificationMessage(action);
      expect(message).toEqual(payload);
    });
  });

  describe('notificationMessage(...) success actions', () => {
    const payloadWarningText = {
      success: 200,
      text: 'Cancel123',
      from: 'ScaledOrders',
    };
    const payloadWarningCode = {
      success: 401,
      text: 'Hello',
      from: 'ScaledOrders',
    };
    const payloadSuccess = {
      success: 200,
      text: 'Hello',
      from: 'ScaledOrders',
    };
    let action, message;

    it('returns a warning message if text includes <Cancel>', () => {
      action = previewPostOrderSuccess(payloadWarningText);
      message = notificationMessage(action);
      expect(message).toEqual({message: 'Order cancelled', type: 'warning'});

      action = bestPostOrderSuccess(payloadWarningText);
      message = notificationMessage(action);
      expect(message).toEqual({message: 'Order cancelled', type: 'warning'});
    });

    it('returns a warning message if success code isnt 200', () => {
      action = previewPostOrderSuccess(payloadWarningCode);
      message = notificationMessage(action);
      expect(message).toEqual({message: 'Order cancelled', type: 'warning'});

      action = bestPostOrderSuccess(payloadWarningCode);
      message = notificationMessage(action);
      expect(message).toEqual({message: 'Order cancelled', type: 'warning'});
    });

    it('returns the same message and type succes if order was placed', () => {
      const {from} = payloadSuccess;

      action = previewPostOrderSuccess(payloadSuccess);
      message = notificationMessage(action);
      expect(message).toEqual({
        message: from,
        type: 'success',
      });

      action = bestPostOrderSuccess(payloadSuccess);
      message = notificationMessage(action);
      expect(message).toEqual({
        message: from,
        type: 'success',
      });
    });

    /* eslint-disable */
    it('returns a message with only a type of [success] or [warning]', () => {});
  });
});

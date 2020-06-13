import {
  postOrderError as postOrderError_preview,
  postOrderSuccess as postOrderSuccess_preview,
} from '../modules/preview';
import {
  postOrderError as postOrderError_best,
  postOrderSuccess as postOrderSuccess_best,
  orderLoading,
} from '../modules/best-price';
import configureStore from 'redux-mock-store';
import notificationMiddleware, { notificationMessage } from './notification';

const middlewares = [notificationMiddleware];
const mockStore = configureStore(middlewares);

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
    store.dispatch(postOrderSuccess_best(payloadSuccess));
    const expectedActions = [
      {
        payload: { message: payloadSuccess.from, type: 'success' },
        type: 'notify/MESSAGE',
      },
      {
        payload: { ...payloadSuccess },
        type: 'best_price/POST_ORDER',
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
    store.dispatch(postOrderError_preview(payloadError));
    const expectedActions = [
      {
        payload: { message: payloadError.message, type: 'error' },
        type: 'notify/MESSAGE',
      },
      {
        payload: { ...payloadError },
        type: 'preview/ORDER_ERROR',
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toHaveLength(2);
  });

  it('should not dispatch notify action for non success actions', () => {
    store.dispatch(orderLoading());

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
      action = orderLoading();
      message = notificationMessage(action);
      expect(message).toEqual({ message: '', type: '' });
    });

    it('returns the same message and type passed for ..._ERROR dispatched actions', () => {
      action = postOrderError_preview(payload);
      message = notificationMessage(action);
      expect(message).toEqual(payload);

      action = postOrderError_best(payload);
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
      action = postOrderSuccess_preview(payloadWarningText);
      message = notificationMessage(action);
      expect(message).toEqual({ message: 'Order cancelled', type: 'warning' });

      action = postOrderSuccess_best(payloadWarningText);
      message = notificationMessage(action);
      expect(message).toEqual({ message: 'Order cancelled', type: 'warning' });
    });

    it('returns a warning message if success code isnt 200', () => {
      action = postOrderSuccess_preview(payloadWarningCode);
      message = notificationMessage(action);
      expect(message).toEqual({ message: 'Order cancelled', type: 'warning' });

      action = postOrderSuccess_best(payloadWarningCode);
      message = notificationMessage(action);
      expect(message).toEqual({ message: 'Order cancelled', type: 'warning' });
    });

    it('returns the same message and type succes if order was placed', () => {
      const { from } = payloadSuccess;

      action = postOrderSuccess_preview(payloadSuccess);
      message = notificationMessage(action);
      expect(message).toEqual({
        message: from,
        type: 'success',
      });

      action = postOrderSuccess_best(payloadSuccess);
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

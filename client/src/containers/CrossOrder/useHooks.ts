import {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {AppState} from 'redux/models/state';
import {orderCrossedOnce, postMarketCrossOrder} from 'redux/modules/cross/crossModule';
import {hasCrossedOnceSelector, hasCrossedSecondTimeSelector, websocketCrossPriceSelector} from 'redux/selectors';

export function useHooks() {
  const {
    hasCrossedOnce,
    hasCrossedSecondTime,
    wsCrossPrice,
    connected,
    crossOrderPrice,
    hasPriceCrossedOnce,
  } = useSelector((state: AppState) => {
    const {websocket, cross} = state;
    return {
      hasCrossedOnce: hasCrossedOnceSelector(state),
      hasCrossedSecondTime: hasCrossedSecondTimeSelector(state),
      wsCrossPrice: websocketCrossPriceSelector(state),
      connected: websocket.connected,
      crossOrderPrice: cross.crossOrderPrice,
      hasPriceCrossedOnce: cross.hasPriceCrossedOnce,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasPriceCrossedOnce && hasCrossedOnce) {
      //TODO RENAME
      dispatch(orderCrossedOnce());
    }
  }, [dispatch, hasPriceCrossedOnce, hasCrossedOnce]);

  useEffect(() => {
    if (hasCrossedSecondTime) {
      //@ts-ignore
      dispatch(postMarketCrossOrder());
    }
  }, [dispatch, hasCrossedSecondTime]);

  return {
    wsCrossPrice,
    connected,
    crossOrderPrice,
  };
}

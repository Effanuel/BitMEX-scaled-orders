import {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {AppState} from 'redux/modules/state';
import {orderCrossedOnce} from 'redux/modules/cross/crossModule';
import {hasCrossedOnceSelector, hasCrossedSecondTimeSelector, websocketCrossPriceSelector} from 'redux/selectors';
import {useApi} from 'general/hooks';

export function useHooks() {
  const {postMarketCrossOrder} = useApi();
  const {hasCrossedOnce, hasCrossedSecondTime, wsCrossPrice, connected, crossOrderPrice, hasPriceCrossedOnce} =
    useSelector((state: AppState) => {
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
      //@ts-expect-error
      postMarketCrossOrder();
    }
  }, [postMarketCrossOrder, hasCrossedSecondTime]);

  return {
    wsCrossPrice,
    connected,
    crossOrderPrice,
  };
}

import {
  AddProfitTargetModalProps,
  CancelAllOrdersModalProps,
  CancelAllProfitOrdersModalProps,
  CancelOrderModalProps,
  CancelProfitOrderModalProps,
} from 'components';
import {ModalType, ShowModalArgs} from './registerModals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickProps<T extends Record<string, any>> = Pick<T, 'props'>['props'];

export interface Modals {
  showCancelOrder: (modalProps: PickProps<CancelOrderModalProps>) => void;
  showCancelProfitOrder: (modal: PickProps<CancelProfitOrderModalProps>) => void;
  showCancelAllOrders: (modal: PickProps<CancelAllOrdersModalProps>) => void;
  showCancelAllProfitOrders: (modalProps: PickProps<CancelAllProfitOrdersModalProps>) => void;
  showAddProfitTarget: (modalProps: PickProps<AddProfitTargetModalProps>) => void;
}

export function createModals(showModal: ({type, props}: ShowModalArgs) => void): Modals {
  return {
    showCancelOrder: (props) => showModal({type: ModalType.CANCEL_ORDER, props}),
    showCancelProfitOrder: (props) => showModal({type: ModalType.CANCEL_PROFIT_ORDER, props}),
    showCancelAllOrders: (props) => showModal({type: ModalType.CANCEL_ALL_ORDERS, props}),
    showCancelAllProfitOrders: (props) => showModal({type: ModalType.CANCEL_ALL_PROFIT_ORDERS, props}),
    showAddProfitTarget: (props) => showModal({type: ModalType.ADD_PROFIT_TARGET, props}),
  };
}

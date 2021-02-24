import React from 'react';
import {
  CancelAllOrdersModal,
  CancelOrderModal,
  AddProfitTargetModal,
  CancelOrderModalProps,
  CancelAllOrdersModalProps,
  AddProfitTargetModalProps,
} from 'components/modals';

export type ShowModalArgs = CancelOrderModalProps | CancelAllOrdersModalProps | AddProfitTargetModalProps;

export enum ModalType {
  CANCEL_ORDER = 'CancelOrder',
  CANCEL_ALL_ORDERS = 'CancelAllOrders',
  ADD_PROFIT_TARGET = 'AddProfitTarget',
}

type RegisteredModals = Readonly<{[key in ModalType]: <P>(modalProps: P, onClose: () => void) => React.ReactNode}>;

export const registeredModals: RegisteredModals = {
  [ModalType.CANCEL_ORDER]: (modalProps: any, onClose) => <CancelOrderModal {...modalProps} onClose={onClose} />,
  [ModalType.CANCEL_ALL_ORDERS]: (modalProps: any, onClose) => (
    <CancelAllOrdersModal {...modalProps} onClose={onClose} />
  ),
  [ModalType.ADD_PROFIT_TARGET]: (modalProps: any, onClose) => (
    <AddProfitTargetModal {...modalProps} onClose={onClose} />
  ),
};

export function showRegisteredModal<P>(type: ModalType, modalProps: P, onClose: () => void) {
  return registeredModals[type](modalProps, onClose);
}

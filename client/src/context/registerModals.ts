import React from 'react';
import {
  CancelOrderModal,
  CancelOrderModalProps,
  CancelAllOrdersModal,
  CancelAllOrdersModalProps,
  CancelProfitOrderModal,
  CancelProfitOrderModalProps,
  CancelAllProfitOrdersModalProps,
  CancelAllProfitOrdersModal,
  AddProfitTargetModal,
  AddProfitTargetModalProps,
} from 'components/modals';

export type ShowModalArgs =
  | CancelOrderModalProps
  | CancelProfitOrderModalProps
  | CancelAllOrdersModalProps
  | CancelAllProfitOrdersModalProps
  | AddProfitTargetModalProps;

export enum ModalType {
  CANCEL_ORDER = 'CancelOrder',
  CANCEL_PROFIT_ORDER = 'CancelProfitOrder',
  CANCEL_ALL_ORDERS = 'CancelAllOrders',
  CANCEL_ALL_PROFIT_ORDERS = 'CancelAllProfitOrders',
  ADD_PROFIT_TARGET = 'AddProfitTarget',
}

type RegisteredModals = Readonly<{[key in ModalType]: any}>;

const registeredModals: RegisteredModals = {
  [ModalType.CANCEL_ORDER]: CancelOrderModal,
  [ModalType.CANCEL_PROFIT_ORDER]: CancelProfitOrderModal,
  [ModalType.CANCEL_ALL_ORDERS]: CancelAllOrdersModal,
  [ModalType.CANCEL_ALL_PROFIT_ORDERS]: CancelAllProfitOrdersModal,
  [ModalType.ADD_PROFIT_TARGET]: AddProfitTargetModal,
};

export function showRegisteredModal<P>(type: ModalType, modalProps: P) {
  return React.createElement(registeredModals[type], modalProps);
}

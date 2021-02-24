import React from 'react';
import _ from 'lodash';
import {ShowModalArgs, showRegisteredModal} from './registerModals';

export enum ModalType {
  CANCEL_ORDER = 'CancelOrder',
  CANCEL_ALL_ORDERS = 'CancelAllOrders',
  ADD_PROFIT_TARGET = 'AddProfitTarget',
}

interface ModalContext {
  modal: ModalType | null;
  showModal(arg: ShowModalArgs): void;
  hideModal(): void;
}

const initialValues: ModalContext = {
  modal: null,
  showModal: _.noop,
  hideModal: _.noop,
};

export const ModalContext = React.createContext<ModalContext>(initialValues);

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = React.useState<ModalType | null>(null);
  const [modalProps, setModalProps] = React.useState<any>({});

  const showModal = React.useCallback(({type, props}: ShowModalArgs) => {
    setModal(type);
    setModalProps(props);
  }, []);

  const hideModal = React.useCallback(() => {
    setModalProps({});
    setModal(null);
  }, []);

  const renderModal = React.useMemo(() => {
    return !modal ? null : showRegisteredModal(modal, modalProps, hideModal);
  }, [modal, hideModal, modalProps]);

  return (
    <ModalContext.Provider value={{modal, showModal, hideModal}}>
      {children}
      {renderModal}
    </ModalContext.Provider>
  );
};

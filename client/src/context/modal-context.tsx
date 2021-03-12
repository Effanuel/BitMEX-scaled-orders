import React from 'react';
import _ from 'lodash';
import {ModalType, ShowModalArgs, showRegisteredModal} from './registerModals';
import {createModals, Modals} from './modals';

export interface ModalContext {
  modals: Modals;
  showModal: (arg: ShowModalArgs) => void;
  hideModal: () => void;
}

const initialContext = {
  showModal: _.noop,
  hideModal: _.noop,
} as ModalContext;

export const ModalContext = React.createContext<ModalContext>(initialContext);

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

  const modals = React.useMemo(() => createModals(showModal), [showModal]);

  const renderModal = React.useMemo(() => {
    return modal ? showRegisteredModal(modal, modalProps) : null;
  }, [modal, modalProps]);

  return (
    <ModalContext.Provider value={{modals, showModal, hideModal}}>
      {children}
      {renderModal}
    </ModalContext.Provider>
  );
};

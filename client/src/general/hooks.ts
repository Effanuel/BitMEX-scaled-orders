import React from 'react';
import {ModalContext} from 'context/modal-context';

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error('Modal context: add wrapper');
  return context;
}

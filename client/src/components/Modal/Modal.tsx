import React from 'react';
import {Modal as ChakraModal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import {Button} from 'components';
import {SIDE} from 'redux/api/bitmex/types';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  isConfirmButtonDisabled?: boolean;
  children: React.ReactNode;
  title: string;
}

export function Modal({onClose, children, title, onConfirm, isConfirmButtonDisabled}: Props) {
  const confirmDialog = React.useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <ChakraModal size="sm" isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={0} m={0} bg="#121212" border="1px solid green">
        <ModalHeader color="white">{title}</ModalHeader>
        <ModalBody pb={6} color="white">
          {children}
        </ModalBody>
        <ModalFooter>
          <Button disabled={isConfirmButtonDisabled} style={{marginRight: 4}} onClick={confirmDialog} label="Confirm" />
          <Button variant={SIDE.SELL} onClick={onClose} label="Dismiss" />
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}

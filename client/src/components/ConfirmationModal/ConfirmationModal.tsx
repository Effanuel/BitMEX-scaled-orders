import React from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from '@chakra-ui/react';
import {Button} from 'components';
import {SIDE} from 'redux/api/bitmex/types';

interface OpenDialog<T = any> {
  passProps: T;
  onConfirm: () => void;
  text: (props: T) => string;
}

export interface RefProps {
  openDialog: <T>(args: OpenDialog<T>) => void;
}

export const ConfirmationModal = React.forwardRef(({}, ref: React.Ref<RefProps>) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [text, setText] = React.useState('');
  const [confirmAction, setConfirmAction] = React.useState({callback: () => {}});

  React.useImperativeHandle(ref, () => ({
    openDialog: ({passProps, onConfirm, text}: OpenDialog) => {
      setText(text(passProps));
      onOpen();
      setConfirmAction({callback: onConfirm});
    },
  }));

  const confirmDialog = React.useCallback(() => {
    confirmAction.callback();
    onClose();
  }, [confirmAction, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={0} m={0} bg="#121212" border="1px solid green">
        <ModalHeader color="white">Cancel Order?</ModalHeader>
        <ModalBody pb={6} color="white">
          {text}
        </ModalBody>
        <ModalFooter>
          <Button style={{marginRight: 4}} onClick={confirmDialog} label="Confirm" />
          <Button variant={SIDE.SELL} onClick={onClose} label="Dismiss" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

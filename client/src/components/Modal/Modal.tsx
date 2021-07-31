import React from 'react';
import {Modal as ChakraModal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import {Button} from 'components';
import {SIDE} from 'redux/api/bitmex/types';
import {useModal} from 'general/hooks';
import {GLOBAL} from 'data-test-ids';

interface Props {
  onConfirm: () => void;
  isConfirmButtonDisabled?: boolean;
  children: React.ReactNode;
  title: string;
}

export function Modal({children, title, onConfirm, isConfirmButtonDisabled}: Props) {
  const {hideModal} = useModal();

  const confirmDialog = React.useCallback(() => {
    onConfirm();
    hideModal();
  }, [onConfirm, hideModal]);

  return (
    <ChakraModal size="sm" isOpen={true} onClose={hideModal} isCentered>
      <ModalOverlay />
      <ModalContent p={0} m={0} bg="#121212" border="1px solid green">
        <ModalHeader color="white">{title}</ModalHeader>
        <ModalBody pb={6} color="white">
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            testID={GLOBAL.MODAL_CONFIRM}
            disabled={isConfirmButtonDisabled}
            style={{marginRight: 4}}
            onClick={confirmDialog}
            label="Confirm"
          />
          <Button variant={SIDE.SELL} onClick={hideModal} label="Dismiss" />
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}

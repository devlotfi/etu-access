import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function SerialConnectionSettings({ isOpen, onOpenChange }: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Serial connection settings
            </ModalHeader>
            <ModalBody>test</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

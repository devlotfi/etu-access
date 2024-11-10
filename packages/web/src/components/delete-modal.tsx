import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface Props {
  onOpenChange: () => void;
  isOpen: boolean;
  isLoading: boolean;
  onDelete: () => void;
}

export default function GenericDeleteModal({
  isOpen,
  onDelete,
  isLoading,
  onOpenChange,
}: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
            <ModalBody>Confirm delete</ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                startContent={
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                }
              >
                Close
              </Button>
              <Button
                color="danger"
                isLoading={isLoading}
                onPress={onDelete}
                startContent={
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                }
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

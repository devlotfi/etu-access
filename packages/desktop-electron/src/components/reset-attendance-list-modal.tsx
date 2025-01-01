import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { AttendanceStore } from '../attendance-store';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function ResetAttendanceListModal({ isOpen, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sign out</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to reset the attendance list ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  AttendanceStore.resetAttendance();
                  queryClient.resetQueries({
                    exact: false,
                    queryKey: ['post', '/students/student-id-cards'],
                  });
                  onClose();
                }}
              >
                Reset
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

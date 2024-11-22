import { $api, PageLoading } from '@etu-access/lib';
import {
  faArrowUpRightFromSquare,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AttendanceStore } from '../attendance-store';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export function ExportAttandanceListModal({
  isOpen,
  onOpenChange,
  onClose,
}: Props) {
  const { data, isLoading } = $api.useQuery(
    'get',
    '/access-controls/available',
  );

  const { mutate } = $api.useMutation('post', '/attendance/export/{id}', {
    onSuccess() {
      onClose();
    },
  });

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      accessControlId: '',
    },
    validationSchema: yup.object({
      accessControlId: yup.string().required(),
    }),
    async onSubmit(values) {
      console.log(values);

      mutate({
        params: {
          path: {
            id: values.accessControlId,
          },
        },
        body: {
          attendanceList: AttendanceStore.attendanceList.map((attendance) => ({
            ...attendance,
            timestamp: attendance.timestamp.toString(),
          })),
        },
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {isLoading || data === undefined ? (
          <PageLoading></PageLoading>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Export attendance list to
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col pb-[1rem] space-y-3"
                onSubmit={handleSubmit}
              >
                <Select
                  name="accessControlId"
                  label="Access control"
                  placeholder="Access control"
                  variant="bordered"
                  startContent={
                    <FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon>
                  }
                  selectedKeys={[values.accessControlId]}
                  onChange={handleChange}
                  items={data}
                >
                  {(accessControl) => (
                    <SelectItem key={accessControl.id}>
                      {accessControl.name}
                    </SelectItem>
                  )}
                </Select>
                <Button
                  type="submit"
                  startContent={
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                    ></FontAwesomeIcon>
                  }
                  color="primary"
                  onPress={() => {}}
                >
                  Export
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

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
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function ExportAttandanceListModal({ isOpen, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const { data, isLoading } = $api.useQuery(
    'get',
    '/access-controls/available',
  );

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      accessControlId: '',
    },
    validationSchema: yup.object({
      accessControlId: yup.string().required(),
    }),
    async onSubmit(values) {
      //mutateConnect(values.portName);
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

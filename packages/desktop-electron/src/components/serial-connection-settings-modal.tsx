import { PageLoading } from '@etu-access/lib';
import {
  faPlug,
  faPlugCircleXmark,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
} from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { CardReaderContext } from '../context/card-reader-context';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export function SerialConnectionSettings({
  isOpen,
  onOpenChange,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const { portName, setPortName } = useContext(CardReaderContext);

  const { data: portListData, isLoading: portListIsLoading } = useQuery({
    queryKey: ['SERIAL_PORT_LIST'],
    queryFn: async () => {
      //const serialPortList: { port_name: string }[] = await invoke('serial_port_list');
      // console.log(serialPortList);
      //return serialPortList;
    },
  });

  const { mutate: mutateConnect, isPending: connectIsPending } = useMutation({
    mutationFn: async (portName: string) => {
      try {
        //await invoke('connect_to_serial_port', { portName });
        setPortName(portName);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { mutate: mutateDisconnect, isPending: disconnectIsPending } =
    useMutation({
      mutationFn: async () => {
        try {
          //await invoke('close_serial_connection');
          setPortName(null);
          onClose();
        } catch (error) {
          console.log(error);
        }
      },
    });

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      portName: '',
    },
    validationSchema: yup.object({
      portName: yup.string().required(),
    }),
    async onSubmit(values) {
      mutateConnect(values.portName);
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {portListIsLoading || portListData === undefined ? (
          <PageLoading></PageLoading>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Serial connection settings
            </ModalHeader>
            <ModalBody className="pb-[1.5rem]">
              <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
                  <Select
                    name="portName"
                    label="Serial port"
                    placeholder="Serial port"
                    variant="bordered"
                    startContent={
                      <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    }
                    selectedKeys={[portName ? portName : values.portName]}
                    isDisabled={portName !== null}
                    onChange={handleChange}
                    items={portListData}
                  >
                    {() => (
                      /*   <SelectItem key={port.port_name}>
                        {port.port_name}
                      </SelectItem> */ <></>
                    )}
                  </Select>

                  <Button
                    isIconOnly
                    onPress={() =>
                      queryClient.resetQueries({
                        exact: false,
                        queryKey: ['SERIAL_PORT_LIST'],
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon>
                  </Button>
                </div>

                {portName ? (
                  <Button
                    onPress={() => mutateDisconnect()}
                    isLoading={disconnectIsPending}
                    startContent={
                      <FontAwesomeIcon
                        icon={faPlugCircleXmark}
                      ></FontAwesomeIcon>
                    }
                    color="danger"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isLoading={connectIsPending}
                    startContent={
                      <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    }
                    color="primary"
                  >
                    Connect
                  </Button>
                )}
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

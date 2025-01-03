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
  SelectItem,
} from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { CardReaderContext } from '../context/card-reader-context';
import { SerialPortData } from '../types/port-data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  stopReader: () => Promise<void>;
}

export function SerialConnectionSettings({
  isOpen,
  onOpenChange,
  onClose,
  stopReader,
}: Props) {
  const queryClient = useQueryClient();

  const { serialPortData, setSerialPortData } = useContext(CardReaderContext);

  const { data: portListData, isLoading: portListIsLoading } = useQuery({
    queryKey: ['SERIAL_PORT_LIST'],
    queryFn: async () => {
      const serialPortList = await navigator.serial.getPorts();
      return serialPortList.map((port, i) => {
        const info = port.getInfo();

        return {
          id: `PORT-${i}/${
            info.usbProductId && info.usbVendorId
              ? `${info.usbProductId}-${info.usbVendorId}`
              : `UNKNOWN`
          }`,
          info,
          port,
        };
      });
    },
  });

  const { mutate: mutateConnect, isPending: connectIsPending } = useMutation({
    mutationFn: async (serialPortData: SerialPortData) => {
      try {
        await serialPortData.port.open({
          baudRate: 9600,
        });
        setSerialPortData(serialPortData);
        setTimeout(() => {
          queryClient.resetQueries({
            exact: false,
            queryKey: ['CARD_DETECTED_LISTENER'],
          });
        }, 1000);
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
          await stopReader();
          onClose();
        } catch (error) {
          console.log(error);
        }
      },
    });

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      serialPortId: '',
    },
    validationSchema: yup.object({
      serialPortId: yup.string().required(),
    }),
    async onSubmit(values) {
      const serialPortData = portListData?.find(
        (port) => port.id === values.serialPortId,
      );
      if (serialPortData) {
        mutateConnect(serialPortData);
      }
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
                    name="serialPortId"
                    label="Serial port"
                    placeholder="Serial port"
                    variant="bordered"
                    startContent={
                      <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    }
                    selectedKeys={[
                      serialPortData ? serialPortData.id : values.serialPortId,
                    ]}
                    isDisabled={serialPortData !== null}
                    onChange={handleChange}
                    items={portListData}
                  >
                    {(port) => <SelectItem key={port.id}>{port.id}</SelectItem>}
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

                {serialPortData ? (
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

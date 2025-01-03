import {
  faCheckCircle,
  faGear,
  faInfoCircle,
  faPlug,
  faPlugCircleXmark,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { SerialConnectionSettings } from '../components/serial-connection-settings-modal';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CardReaderContext } from '../context/card-reader-context';
import { useQuery } from '@tanstack/react-query';
import { IdCardSVG } from '@etu-access/lib';
import { AttendanceStore } from '../attendance-store';

export default function CardReaderPage() {
  const { serialPortData, setSerialPortData, readerRef } =
    useContext(CardReaderContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [cardDetectedStatus, setCardDetectedStatus] = useState<
    'ATTENDANCE_SAVED' | 'ATTENDANCE_ALREADY_SAVED' | null
  >(null);

  const { isLoading } = useQuery({
    queryKey: ['CARD_DETECTED_LISTENER'],
    networkMode: 'online',

    queryFn: async () => {
      console.log('lll', serialPortData);

      if (serialPortData) {
        readerRef.current = serialPortData.port.readable!.getReader();
        const decoder = new TextDecoder();
        let buffer = ''; // Accumulate chunks here

        console.log('Listening for messages...');

        try {
          while (true) {
            const { value, done } = await readerRef.current.read();
            if (done) {
              console.log('Stream closed.');
              break;
            }
            if (value) {
              // Decode the chunk and append to the buffer
              buffer += decoder.decode(value, { stream: true });

              // Split the buffer on newline to extract complete messages
              const parts = buffer.split('\n');

              // Process all but the last part (it might be incomplete)
              parts.slice(0, -1).forEach((message) => {
                const cardId = message.trim();
                const result = AttendanceStore.addAttendance({
                  cardId,
                  timestamp: new Date(),
                });
                if (!result) {
                  setCardDetectedStatus('ATTENDANCE_ALREADY_SAVED');
                } else {
                  setCardDetectedStatus('ATTENDANCE_SAVED');
                }
              });

              // Keep the incomplete part in the buffer
              buffer = parts[parts.length - 1];
            }
          }
        } catch (error) {
          console.error('Error while reading:', error);
        } finally {
          readerRef.current.releaseLock();
        }
      }
      return null;
    },
  });

  useEffect(() => {
    let timeout: unknown;

    if (
      cardDetectedStatus === 'ATTENDANCE_SAVED' ||
      cardDetectedStatus === 'ATTENDANCE_ALREADY_SAVED'
    ) {
      timeout = setTimeout(() => {
        setCardDetectedStatus(null);
      }, 1000);
    } else {
      timeout = undefined;
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout as number);
      }
    };
  }, [cardDetectedStatus]);

  const stopReader = useCallback(async () => {
    if (readerRef.current) {
      await readerRef.current.cancel();
      readerRef.current.releaseLock();
      readerRef.current = null;
      await serialPortData?.port.close();
      setSerialPortData(null);
    }
  }, [readerRef, serialPortData?.port, setSerialPortData]);

  useEffect(() => {
    return () => {
      stopReader();
    };
  }, [stopReader]);

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between bg-content2 h-[4rem] items-center px-[1rem] border-b border-divider">
          <Button
            variant="bordered"
            className="bg-background"
            startContent={<FontAwesomeIcon icon={faGear}></FontAwesomeIcon>}
            onPress={onOpen}
          >
            Serial connection
          </Button>

          <div className="flex items-center space-x-2">
            {serialPortData ? (
              <Chip
                size="lg"
                color={'success'}
                startContent={<FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>}
              >
                Connected: {serialPortData.id}
              </Chip>
            ) : (
              <Chip
                size="lg"
                color={'danger'}
                startContent={
                  <FontAwesomeIcon icon={faPlugCircleXmark}></FontAwesomeIcon>
                }
              >
                Disconnected
              </Chip>
            )}
            {isLoading ? (
              <Chip
                size="lg"
                color={'primary'}
                startContent={
                  <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon>
                }
              >
                Checking for cards
              </Chip>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-center items-center space-y-10">
          {cardDetectedStatus === 'ATTENDANCE_SAVED' ? (
            <>
              <FontAwesomeIcon
                className="text-success text-[10rem]"
                icon={faCheckCircle}
              ></FontAwesomeIcon>
              <div className="flex text-[30pt] font-bold">Attendance saved</div>
            </>
          ) : cardDetectedStatus === 'ATTENDANCE_ALREADY_SAVED' ? (
            <>
              <FontAwesomeIcon
                className="text-warning text-[10rem]"
                icon={faInfoCircle}
              ></FontAwesomeIcon>
              <div className="flex text-[30pt] font-bold">
                Attendance already saved
              </div>
            </>
          ) : (
            <>
              <img
                className="h-[12rem] drop-shadow-md"
                src={IdCardSVG}
                alt="id-card"
              />
              <div className="flex text-[20pt] font-bold">
                Scan you student ID Card
              </div>
            </>
          )}
        </div>
      </div>

      <SerialConnectionSettings
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        stopReader={stopReader}
      ></SerialConnectionSettings>
    </>
  );
}

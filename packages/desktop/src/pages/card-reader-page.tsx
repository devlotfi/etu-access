import {
  faGear,
  faPlug,
  faPlugCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { SerialConnectionSettings } from '../components/serial-connection-settings-modal';
import { useContext, useEffect } from 'react';
import { CardReaderContext } from '../context/card-reader-context';
import { useQuery } from '@tanstack/react-query';
import { Event, listen } from '@tauri-apps/api/event';
import { PageLoading } from '@etu-access/lib';

export default function CardReaderPage() {
  const { portName } = useContext(CardReaderContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: unlisten, isLoading } = useQuery({
    queryKey: ['CARD_DETECTED_LISTENER'],
    queryFn: async () => {
      const unlisten = listen('CARD_DETECTED', (cardId: Event<string>) => {
        console.log(cardId);
      });
      return unlisten;
    },
  });

  useEffect(() => {
    if (unlisten) {
      unlisten();
    }
  }, []);

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between h-[4rem] items-center px-[1rem] border-b border-divider">
          <Button
            variant="bordered"
            className="bg-background"
            startContent={<FontAwesomeIcon icon={faGear}></FontAwesomeIcon>}
            onPress={onOpen}
          >
            Serial connection
          </Button>

          {portName ? (
            <Chip
              size="lg"
              color={'success'}
              startContent={<FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>}
            >
              Connected: {portName}
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
        </div>
      </div>

      <SerialConnectionSettings
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></SerialConnectionSettings>
    </>
  );
}

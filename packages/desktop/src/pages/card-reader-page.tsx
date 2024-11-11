import { faGear, faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { SerialConnectionSettings } from '../components/serial-connection-settings-modal';

export default function CardReaderPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

          <Chip
            size="lg"
            color="success"
            startContent={<FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>}
          >
            Connected
          </Chip>
        </div>
      </div>

      <SerialConnectionSettings
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></SerialConnectionSettings>
    </>
  );
}

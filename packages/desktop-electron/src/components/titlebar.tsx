import { LogoSVG } from '@etu-access/lib';
import {
  faTimes,
  faWindowMaximize,
  faWindowMinimize,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';

export default function TitleBar() {
  return (
    <div className="titlebar flex h-[2.5rem] justify-between items-center border-b border-divider">
      <div className="flex items-center px-[0.5rem] space-x-2 select-none">
        <img className="h-[1.3rem]" src={LogoSVG} alt="logo" />
      </div>

      <div className="flex px-[0.2rem] space-x-1">
        <h1></h1>
        <Button
          onPress={() => window.electronAPI.minimize()}
          className="titlebar-btn"
          size="sm"
          variant="bordered"
          isIconOnly
        >
          <FontAwesomeIcon icon={faWindowMinimize}></FontAwesomeIcon>
        </Button>
        <Button
          onPress={() => window.electronAPI.maximize()}
          className="titlebar-btn"
          size="sm"
          variant="bordered"
          isIconOnly
        >
          <FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon>
        </Button>
        <Button
          onPress={() => window.electronAPI.close()}
          className="titlebar-btn"
          size="sm"
          variant="bordered"
          isIconOnly
        >
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
}

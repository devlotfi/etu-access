import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, cn, useDisclosure } from '@nextui-org/react';
import { useContext } from 'react';
import { DashboardContext } from '../context/dashboard-context';
import { LogoSVG, SignOutModal } from '@etu-access/lib';
import DashboardNavbarDropdown from './dashboard-navbar-dropdown';

export default function DashboardNavbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(DashboardContext);
  const {
    isOpen: signOutModalIsOpen,
    onOpen: signOutModalOnOpen,
    onOpenChange: signOutModalOnOpenChange,
  } = useDisclosure();

  return (
    <div className="flex px-[1rem] h-[4rem] bg-background items-center justify-between border-b border-divider">
      <div className="flex items-center space-x-3">
        <Button
          isIconOnly
          variant="bordered"
          className="border-divider"
          onPress={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon
            className={cn(
              'text-[13pt] duration-500',
              sidebarOpen && 'rotate-180',
            )}
            icon={faAngleDoubleRight}
          ></FontAwesomeIcon>
        </Button>
        {!sidebarOpen ? (
          <>
            <img className="h-[2rem]" src={LogoSVG} alt="logo" />{' '}
            <div className="flex font-bold font-['Fugaz_One'] text-[16pt]">
              EtuAccess
            </div>
          </>
        ) : null}
      </div>

      <DashboardNavbarDropdown
        openSignOutModal={signOutModalOnOpen}
      ></DashboardNavbarDropdown>
      <SignOutModal
        isOpen={signOutModalIsOpen}
        onOpenChange={signOutModalOnOpenChange}
      ></SignOutModal>
    </div>
  );
}

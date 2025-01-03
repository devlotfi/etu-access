import {
  faGear,
  faPowerOff,
  faTowerBroadcast,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import HomePageTile from '../components/home-page-tile';
import { ScrollShadow, useDisclosure } from '@nextui-org/react';
import { SignOutModal } from '@etu-access/lib';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex overflow-x-auto flex-1 justify-center items-center">
        <ScrollShadow
          className="flex flex-row space-x-5 px-[1.5rem]"
          orientation="horizontal"
        >
          <HomePageTile
            icon={faTowerBroadcast}
            title="Card reader"
            onPress={() => navigate('/dashboard/card-reader')}
          ></HomePageTile>
          <HomePageTile
            icon={faUsers}
            title="Attending students"
            onPress={() => navigate('/dashboard/attending-students')}
          ></HomePageTile>
          <HomePageTile
            icon={faGear}
            title="Settings"
            onPress={() => navigate('/dashboard/settings')}
          ></HomePageTile>
          <HomePageTile
            onPress={() => onOpen()}
            className="text-danger"
            icon={faPowerOff}
            title="Sign out"
          ></HomePageTile>
        </ScrollShadow>
      </div>

      <SignOutModal isOpen={isOpen} onOpenChange={onOpenChange}></SignOutModal>
    </>
  );
}

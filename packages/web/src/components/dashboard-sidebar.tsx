import {
  faAngleDoubleLeft,
  faDoorOpen,
  faGear,
  faUsers,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons';
import { Button, cn } from '@nextui-org/react';
import { useContext } from 'react';
import SidebarItem from './sidebar-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardContext } from '../context/dashboard-context';
import { AuthContext, LogoSVG } from '@etu-access/lib';

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const { sidebarOpen, setSidebarOpen } = useContext(DashboardContext);

  if (!user) {
    throw new Error('No user');
  }

  const sidebarNavigate = (path: string) => {
    navigate(path);
    if (!window.matchMedia(`(min-width: 1024px)`).matches) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex lg:hidden fixed h-screen w-screen bg-black opacity-50 z-40',
          !sidebarOpen && 'hidden',
        )}
      ></div>
      <div
        className={cn(
          'flex flex-col absolute lg:static z-40 h-full lg:h-auto ml-[-18rem] min-w-[18rem] bg-background border-r border-divider duration-300',
          sidebarOpen && 'ml-0',
        )}
      >
        <div className="flex items-center justify-between p-[1.5rem]">
          <div className="flex items-center space-x-3">
            <img className="h-[2rem]" src={LogoSVG} alt="logo" />
            <div className="flex font-bold text-[16pt] font-['Fugaz_One']">
              EtuAccess
            </div>
          </div>

          <Button
            isIconOnly
            variant="bordered"
            className="border-divider lg:hidden"
            onPress={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
          </Button>
        </div>

        <div className="flex flex-col p-[1rem] space-y-3">
          <SidebarItem
            title="Access controls"
            active={pathname === '/dashboard'}
            onPress={() => sidebarNavigate('/dashboard')}
            icon={faDoorOpen}
          ></SidebarItem>
          {user.isAdmin ? (
            <>
              <SidebarItem
                title="Users"
                active={pathname === '/dashboard/users'}
                onPress={() => sidebarNavigate('/dashboard/users')}
                icon={faUsersGear}
              ></SidebarItem>
              <SidebarItem
                title="Students"
                active={pathname === '/dashboard/students'}
                onPress={() => sidebarNavigate('/dashboard/students')}
                icon={faUsers}
              ></SidebarItem>
            </>
          ) : null}
          <SidebarItem
            title="Settings"
            active={pathname === '/dashboard/settings'}
            onPress={() => sidebarNavigate('/dashboard/settings')}
            icon={faGear}
          ></SidebarItem>
        </div>
      </div>
    </>
  );
}

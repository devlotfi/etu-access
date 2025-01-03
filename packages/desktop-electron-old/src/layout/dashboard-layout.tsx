import {
  AuthContext,
  LogoSVG,
  ThemeContext,
  ThemeOptions,
} from '@etu-access/lib';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, cn } from '@nextui-org/react';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './dahsboard-layout.css';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { appliedTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    throw new Error('No user');
  }

  return (
    <div
      className={cn(
        'flex flex-col flex-1 bg-content2 overflow-x-hidden',
        appliedTheme === ThemeOptions.LIGHT
          ? 'dashboard-layout-bg-light'
          : 'dashboard-layout-bg-dark',
      )}
    >
      <div className="flex items-center bg-background px-[1rem] h-[4rem] justify-between border-b border-divider">
        <div className="flex items-center space-x-2">
          <Button
            variant="bordered"
            isIconOnly
            onPress={() => navigate('/dashboard')}
          >
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          </Button>
          <img className="h-[2rem]" src={LogoSVG} alt="logo" />
          <div className="flex font-bold text-[16pt] font-['Fugaz_One']">
            EtuAccess
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col leading-4 items-end font-bold">
            {user.firstName} {user.lastName}
          </div>
          <Avatar
            color="primary"
            size="sm"
            isBordered
            imgProps={{ referrerPolicy: 'no-referrer' }}
            as="button"
          ></Avatar>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

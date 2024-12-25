import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react';
import { useContext } from 'react';
import { AuthContext } from '@etu-access/lib';

interface Props {
  openSignOutModal: () => void;
}

export default function DashboardNavbarDropdown({ openSignOutModal }: Props) {
  const { user } = useContext(AuthContext);

  if (!user) {
    throw new Error('No user');
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex flex-col leading-4 items-end font-bold">
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
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        onAction={(key) => {
          {
            switch (key) {
              case 'sign-out':
                openSignOutModal();
                break;
            }
          }
        }}
      >
        <DropdownSection showDivider>
          <DropdownItem key="user" textValue="User">
            <div className="flex font-bold text-[13pt]">User: </div>
            <div className="flex text-[10pt]">
              {user.firstName} {user.lastName}
            </div>
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          key="sign-out"
          className="text-danger"
          color="danger"
          textValue="sign-out"
          closeOnSelect
          startContent={<FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps, cn } from '@nextui-org/react';

interface Props extends ButtonProps {
  title: string;
  active: boolean;
  icon: IconProp;
}

export default function SidebarItem({ title, active, icon, ...props }: Props) {
  return (
    <Button
      className={cn('justify-start text-[12pt] space-x-3 py-[1.5rem]')}
      variant={active ? 'solid' : 'light'}
      color={active ? 'primary' : 'default'}
      startContent={<FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      {...props}
    >
      <div className="flex font-bold">{title}</div>
    </Button>
  );
}

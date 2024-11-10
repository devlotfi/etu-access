import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps, cn } from '@nextui-org/react';

interface Props extends ButtonProps {
  title: string;
  active?: boolean;
  icon: IconProp;
}

export default function NavigationTab({
  active,
  icon,
  title,
  ...props
}: Props) {
  return (
    <Button
      className={cn(
        'font-bold bg-content2',
        active && 'bg-primary text-primary-foreground border border-divider',
      )}
      startContent={<FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      {...props}
    >
      {title}
    </Button>
  );
}

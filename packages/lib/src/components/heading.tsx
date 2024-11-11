import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@nextui-org/react';

interface ClassNames {
  wrapper?: string;
  icon?: string;
  text?: string;
}

interface Props {
  icon: IconProp;
  text: string;
  classNames?: ClassNames;
}

export function Heading({ classNames = {}, icon, text }: Props) {
  return (
    <div
      className={cn(
        'flex items-center space-x-3 ml-[0.5rem] text-[20pt]',
        classNames.wrapper,
      )}
    >
      <FontAwesomeIcon
        icon={icon}
        className={cn('text-primary', classNames.icon)}
      ></FontAwesomeIcon>
      <div className={cn('font-bold', classNames.text)}>{text}</div>
    </div>
  );
}

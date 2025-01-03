import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardBody,
  Divider,
  CardFooter,
  CardProps,
  cn,
} from '@nextui-org/react';

interface Props extends CardProps {
  icon: IconProp;
  title: string;
}

export default function HomePageTile({
  icon,
  title,
  className,
  ...props
}: Props) {
  return (
    <Card
      shadow="none"
      isPressable
      className={cn(
        'border border-divider min-h-[18rem] min-w-[12rem]',
        className,
      )}
      {...props}
    >
      <CardBody className="justify-center items-center">
        <FontAwesomeIcon className="text-[30pt]" icon={icon}></FontAwesomeIcon>
      </CardBody>
      <Divider></Divider>
      <CardFooter className="justify-center">
        <div className="flex">{title}</div>
      </CardFooter>
    </Card>
  );
}

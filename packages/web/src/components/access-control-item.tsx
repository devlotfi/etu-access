import { memo } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  cn,
  Divider,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { components } from '@etu-access/lib';

interface Props {
  accessControl: components['schemas']['AccessControlDTO'];
}

function AccessControlItem({ accessControl }: Props) {
  const navigate = useNavigate();

  return (
    <Card shadow="none" className="border border-divider w-full">
      <CardBody>
        <div className="flex text-[17pt] font-bold">{accessControl.name}</div>
        <div className="flex space-x-1  text-[13pt]">
          <div className="flex">Status: </div>
          <div
            className={cn(
              'flex',
              accessControl.open ? 'text-success' : 'text-danger',
            )}
          >
            {accessControl.open ? 'Open' : 'Closed'}
          </div>
        </div>
      </CardBody>
      <Divider></Divider>
      <CardFooter className="justify-end">
        <Button
          onPress={() =>
            navigate(`/dashboard/access-controls/${accessControl.id}`)
          }
          variant="ghost"
          endContent={
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
          }
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(AccessControlItem);

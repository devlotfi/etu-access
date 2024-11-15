import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Switch,
  useDisclosure,
} from '@nextui-org/react';
import { faDoorOpen, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import GenericDeleteModal from '../../components/delete-modal';
import {
  $api,
  components,
  PageError,
  PageLoading,
  ValidatedInput,
} from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

export default function AccessControlDetailsPage() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = $api.useQuery(
    'get',
    '/access-controls/{id}',
    {
      params: {
        path: {
          id: id!,
        },
      },
    },
  );

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  if (isError || !data) {
    return <PageError error={error}></PageError>;
  }

  return <DetailsForm accessControl={data!}></DetailsForm>;
}

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function DeleteModal({ isOpen, onOpenChange }: DeleteModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation(
    'delete',
    '/access-controls/{id}',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/access-controls'],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/access-controls/{id}'],
        });
        navigate('/dashboard');
      },
    },
  );

  return (
    <GenericDeleteModal
      isLoading={isPending}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onDelete={() => {
        mutate({
          params: {
            path: {
              id: id!,
            },
          },
        });
      }}
    ></GenericDeleteModal>
  );
}

interface DetailsFormProps {
  accessControl: components['schemas']['AccessControlDTO'];
}

function DetailsForm({ accessControl }: DetailsFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate, isPending, isError, error } = $api.useMutation(
    'patch',
    '/access-controls/{id}',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/access-controls'],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/access-controls/{id}'],
        });
        navigate('/dashboard');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      ...accessControl,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      open: yup.boolean(),
    }),
    onSubmit(values) {
      mutate({
        params: {
          path: {
            id: id!,
          },
        },
        body: {
          ...values,
        },
      });
    },
  });

  return (
    <>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange}></DeleteModal>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-screen-md px-[1rem] pb-[5rem]">
          <Heading
            icon={faDoorOpen}
            text="Access control details"
            classNames={{ wrapper: 'py-[1rem]' }}
          ></Heading>

          <Card className="border-divider border" shadow="none">
            <CardBody>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col space-y-3"
              >
                <ValidatedInput
                  name="name"
                  placeholder="Name"
                  label="Name"
                  formik={formik}
                ></ValidatedInput>
                <Switch
                  name="open"
                  isSelected={formik.values.open}
                  onChange={formik.handleChange}
                  className="ml-[1rem]"
                >
                  Open
                </Switch>

                {isError ? (
                  <Card shadow="none" className="bg-danger text-white">
                    <CardBody>{error.message}</CardBody>
                  </Card>
                ) : null}

                <div className="flex space-x-3">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isPending}
                    startContent={
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    color="danger"
                    variant="bordered"
                    startContent={
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    }
                    onPress={onOpen}
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

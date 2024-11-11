import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  useDisclosure,
} from '@nextui-org/react';
import {
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import PageLoading from '../../components/page-loadings';
import PageError from '../../components/page-error';
import { useState } from 'react';
import GenericDeleteModal from '../../components/delete-modal';
import { $api, components, Heading, ValidatedInput } from '@etu-access/lib';

export default function UserDetailsPage() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = $api.useQuery(
    'get',
    '/users/{id}',
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

  return <DetailsForm user={data!}></DetailsForm>;
}

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function DeleteModal({ isOpen, onOpenChange }: DeleteModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation('delete', '/users/{id}', {
    onSuccess() {
      queryClient.resetQueries({
        exact: false,
        queryKey: ['get', '/users'],
      });
      queryClient.resetQueries({
        exact: false,
        queryKey: ['get', '/users/{id}'],
      });
      navigate('/dashboard/users');
    },
  });

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
  user: components['schemas']['UserDTO'];
}

function DetailsForm({ user }: DetailsFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isPending, isError, error } = $api.useMutation(
    'patch',
    '/users/{id}',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/users'],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/users/{id}'],
        });
        navigate('/dashboard/users');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      ...user,
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(7),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match'),
      isAdmin: yup.bool(),
    }),
    onSubmit(values) {
      mutate({
        params: {
          path: {
            id: id!,
          },
        },
        body: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password !== '' ? values.password : undefined,
          isAdmin: values.isAdmin,
        },
      });
    },
  });

  return (
    <>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange}></DeleteModal>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-screen-md px-[1rem]">
          <Heading
            icon={faUserGear}
            text="User details"
            classNames={{ wrapper: 'py-[1rem]' }}
          ></Heading>

          <Card className="border-divider border" shadow="none">
            <CardBody>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col space-y-3"
              >
                <ValidatedInput
                  name="firstName"
                  placeholder="First name"
                  label="First name"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="lastName"
                  placeholder="Last name"
                  label="Last name"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="email"
                  placeholder="E-mail"
                  label="E-mail"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="password"
                  placeholder="Password"
                  label="Password"
                  formik={formik}
                  type={showPassword ? 'text' : 'password'}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                      )}
                    </button>
                  }
                ></ValidatedInput>
                <ValidatedInput
                  name="confirmPassword"
                  placeholder="Confirm password"
                  label="Confirm password"
                  formik={formik}
                  type={showPassword ? 'text' : 'password'}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                      )}
                    </button>
                  }
                ></ValidatedInput>
                <Checkbox
                  name="isAdmin"
                  isSelected={formik.values.isAdmin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="ml-[1rem]"
                >
                  Is an administrator
                </Checkbox>

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

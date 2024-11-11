import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  DateValue,
  useDisclosure,
} from '@nextui-org/react';
import { faPen, faTrash, faUserGear } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import PageLoading from '../../components/page-loadings';
import PageError from '../../components/page-error';
import GenericDeleteModal from '../../components/delete-modal';
import { parseDate } from '@internationalized/date';
import { $api, components, ValidatedInput } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

export default function StudentDetailsPage() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = $api.useQuery(
    'get',
    '/students/{id}',
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

  return <DetailsForm student={data!}></DetailsForm>;
}

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function DeleteModal({ isOpen, onOpenChange }: DeleteModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation('delete', '/students/{id}', {
    onSuccess() {
      queryClient.resetQueries({
        exact: false,
        queryKey: ['get', '/students'],
      });
      queryClient.resetQueries({
        exact: false,
        queryKey: ['get', '/students/{id}'],
      });
      navigate('/dashboard/students');
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
  student: components['schemas']['StudentDTO'];
}

function DetailsForm({ student }: DetailsFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate, isPending, isError, error } = $api.useMutation(
    'patch',
    '/students/{id}',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/students'],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/students/{id}'],
        });
        navigate('/dashboard/students');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      ...student,
      dateOfBirth: parseDate(
        new Date(student.dateOfBirth).toISOString().split('T')[0],
      ),
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      registration: yup.string().required(),
      cardId: yup.string().required(),
      level: yup.string().required(),
      speciality: yup.string().required(),
      section: yup.string().required(),
      directedWorkGroup: yup.string().required(),
      practicalWorkGroup: yup.string().required(),
    }),
    onSubmit(values) {
      const dateOfBirth: DateValue = values.dateOfBirth as unknown as DateValue;
      mutate({
        params: {
          path: {
            id: id!,
          },
        },
        body: {
          ...values,
          dateOfBirth: dateOfBirth.toString(),
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
            icon={faUserGear}
            text="Student details"
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
                <DatePicker
                  label="Birth date"
                  variant="bordered"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={(value) =>
                    formik.setFieldValue('dateOfBirth', value)
                  }
                />
                <ValidatedInput
                  name="registration"
                  placeholder="Registration"
                  label="Registration"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="cardId"
                  placeholder="Card ID"
                  label="Card ID"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="level"
                  placeholder="Level"
                  label="Level"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="speciality"
                  placeholder="Speciality"
                  label="Speciality"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="section"
                  placeholder="Section"
                  label="Section"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="directedWorkGroup"
                  placeholder="Directed Work Group"
                  label="Directed Work Group"
                  formik={formik}
                ></ValidatedInput>
                <ValidatedInput
                  name="practicalWorkGroup"
                  placeholder="Practical Work Group"
                  label="Practical Work Group"
                  formik={formik}
                ></ValidatedInput>

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

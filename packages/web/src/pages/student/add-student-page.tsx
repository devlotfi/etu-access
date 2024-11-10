import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Heading from '../../components/heading';
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  DateValue,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { parseDate } from '@internationalized/date';
import ValidatedInput from '../../components/validated-input';
import { $api } from '@etu-access/lib';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: parseDate(new Date().toISOString().split('T')[0]),
      registration: '',
      cardId: '',
      level: '',
      speciality: '',
      section: '',
      directedWorkGroup: '',
      practicalWorkGroup: '',
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
        body: {
          ...values,
          dateOfBirth: dateOfBirth.toString(),
        },
      });
    },
  });

  const { mutate, isPending, isError, error } = $api.useMutation(
    'post',
    '/students',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/students'],
        });
        navigate('/dashboard/students');
      },
    },
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-screen-md px-[1rem] pb-[5rem]">
        <Heading
          icon={faPlus}
          text="Add student"
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
                onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
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

              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              >
                Add student
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

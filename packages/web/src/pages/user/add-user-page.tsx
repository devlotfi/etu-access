import { faEye, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardBody, Checkbox } from '@nextui-org/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { $api, ValidatedInput } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

export default function AddUserPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(7).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(),
      isAdmin: yup.bool(),
    }),
    onSubmit(values) {
      mutate({
        body: {
          ...values,
        },
      });
    },
  });

  const { mutate, isPending, isError, error } = $api.useMutation(
    'post',
    '/users',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/users'],
        });
        navigate('/dashboard/users');
      },
    },
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-screen-md px-[1rem]">
        <Heading
          icon={faPlus}
          text="Add user"
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

              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              >
                Add user
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

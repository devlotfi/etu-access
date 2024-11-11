import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardBody, Switch } from '@nextui-org/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $api, ValidatedInput } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

export default function AddAccessControlPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: '',
      open: false,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      open: yup.boolean(),
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
    '/access-controls',
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ['get', '/access-controls'],
        });
        navigate('/dashboard');
      },
    },
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-screen-md px-[1rem] pb-[5rem]">
        <Heading
          icon={faPlus}
          text="Add access control"
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

              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              >
                Add access control
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

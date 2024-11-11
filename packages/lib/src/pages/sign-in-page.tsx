import {
  Button,
  Card,
  CardBody,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAt,
  faComputer,
  faKey,
  faMoon,
  faPaintBrush,
  faSignIn,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { PropsWithChildren, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import LogoSVG from '../assets/svg/logo.svg';
import { ThemeContext } from '../context/theme-context';
import { $api } from '../api/openapi-react-query-client';
import { ThemeOptions } from '../types/theme-options';
import { InMemoryStore } from '../api/in-memory-store';
import './sign-in-page.css';
import { TokenType } from '../types/token-type';

interface Props {
  tokenType: TokenType;
}

export function SignInPage({ tokenType }: PropsWithChildren<Props>) {
  const { setTheme, themeOption, appliedTheme } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      }),
      onSubmit(values) {
        mutate({
          body: {
            email: values.email,
            password: values.password,
            tokenType,
          },
          credentials: 'include',
        });
      },
    });

  const { isPending, mutate, error, isError } = $api.useMutation(
    'post',
    '/auth/sign-in',
    {
      onSuccess(data) {
        if (tokenType === 'ACCESS_POINT') {
          InMemoryStore.refreshToken = data.refreshToken;
        }
        console.log(InMemoryStore.refreshToken);

        queryClient.refetchQueries({
          exact: false,
          queryKey: ['get', '/auth/sign-in/refresh-token'],
        });
      },
    },
  );

  return (
    <div className="flex flex-col flex-1">
      <Navbar className="border-b border-divider" isBlurred={false}>
        <NavbarBrand className="space-x-3">
          <img className="h-[2rem]" src={LogoSVG} alt="logo" />
          <div className="flex font-bold text-[16pt] font-['Fugaz_One']">
            EtuAccess
          </div>
        </NavbarBrand>

        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="ghost"
                startContent={
                  <FontAwesomeIcon icon={faPaintBrush}></FontAwesomeIcon>
                }
              >
                {'theme'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={[themeOption]}
              onAction={(key) => {
                setTheme(key as ThemeOptions);
              }}
            >
              <DropdownItem
                key={ThemeOptions.SYSTEM}
                startContent={
                  <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
                }
              >
                {'system'}
              </DropdownItem>
              <DropdownItem
                key={ThemeOptions.LIGHT}
                startContent={<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>}
              >
                {'light'}
              </DropdownItem>
              <DropdownItem
                key={ThemeOptions.DARK}
                startContent={<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>}
              >
                {'dark'}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div
        className={cn(
          'flex flex-col md:flex-row p-[0.5rem] md:justify-center items-center flex-1 bg-content2 space-x-3',
          appliedTheme === ThemeOptions.LIGHT
            ? 'sign-in-bg-light'
            : 'sign-in-bg-dark',
        )}
      >
        <Card className="max-w-screen-sm mt-[5rem] md:mt-0 w-full overflow-visible border border-divider">
          <div className="flex justify-center">
            <div className="flex justify-center items-center h-[5rem] w-[5rem] bg-content2 border border-divider rounded-full mt-[-2.5rem]">
              <FontAwesomeIcon
                className="text-[20pt] text-primary"
                icon={faUser}
              ></FontAwesomeIcon>
            </div>
          </div>

          <CardBody className="md:p-[1.5rem] flex-row">
            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <div className="flex items-center space-x-3 ml-[0.5rem] text-[20pt] font-bold">
                <div className="flex">
                  <FontAwesomeIcon
                    className="text-primary"
                    icon={faSignIn}
                  ></FontAwesomeIcon>
                </div>
                <div className="flex">Sign in</div>
              </div>
              <Input
                type="email"
                name="email"
                value={values.email}
                variant={errors.email && touched.email ? 'bordered' : 'flat'}
                isInvalid={errors.email && touched.email ? true : false}
                errorMessage={
                  errors.email && touched.email ? errors.email : undefined
                }
                color={errors.email && touched.email ? 'danger' : 'default'}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                placeholder="Enter email"
                startContent={<FontAwesomeIcon icon={faAt}></FontAwesomeIcon>}
              />
              <Input
                type="password"
                name="password"
                value={values.password}
                variant={
                  errors.password && touched.password ? 'bordered' : 'flat'
                }
                isInvalid={errors.password && touched.password ? true : false}
                errorMessage={
                  errors.password && touched.password
                    ? errors.password
                    : undefined
                }
                color={
                  errors.password && touched.password ? 'danger' : 'default'
                }
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
                placeholder="Enter password"
                startContent={<FontAwesomeIcon icon={faKey}></FontAwesomeIcon>}
              />

              {isError && error ? (
                <Card shadow="none" className="bg-danger text-white">
                  <CardBody>{error.message}</CardBody>
                </Card>
              ) : null}

              <Button
                type="submit"
                fullWidth
                isLoading={isPending}
                color="primary"
                startContent={
                  <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
                }
              >
                Sign in
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="hidden xl:flex flex-col items-center space-y-3 max-w-[25rem]">
          <img className="h-[4rem]" src={LogoSVG} alt="logo" />
          <div className="flex font-bold text-[17pt] text-center">
            Welcome to the administration dashboard of EtuAccess
          </div>
        </div>
      </div>
    </div>
  );
}

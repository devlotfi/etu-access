import { PropsWithChildren } from 'react';
import { Spinner } from '@nextui-org/react';
import { $api } from '../api/openapi-react-query-client';
import { AuthContext } from '../context/auth-context';
import { InMemoryStore } from '../main';
import LogoSVG from '../assets/svg/logo.svg';
import { RefreshTokenMode } from '../types/refresh-token-mode';

interface Props {
  refreshTokenMode: RefreshTokenMode;
}

export function AuthProvider({
  children,
  refreshTokenMode,
}: PropsWithChildren<Props>) {
  const { isLoading, data } = $api.useQuery(
    'get',
    '/auth/sign-in/refresh-token',
    {
      credentials: 'include',
      params: {
        query: {
          refreshToken:
            refreshTokenMode === 'IN_MEMORY'
              ? InMemoryStore.refreshToken
              : undefined,
        },
      },
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      select(data) {
        InMemoryStore.accessToken = data.accessToken;
        return data;
      },
    },
  );

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-5 h-screen w-screen justify-center items-center">
        <img className="h-[3rem]" src={LogoSVG} alt="logo" />
        <Spinner size="lg" color="primary"></Spinner>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

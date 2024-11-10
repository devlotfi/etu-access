import { AuthContext } from '@etu-access/lib';
import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

export function NotProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return children;
}

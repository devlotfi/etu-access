import { createContext } from 'react';
import { components } from '../__generated__/schema';

interface AuthContext {
  user: components['schemas']['UserDTO'] | null;
}

export const AuthContextInitialValue: AuthContext = {
  user: null,
};

export const AuthContext = createContext(AuthContextInitialValue);
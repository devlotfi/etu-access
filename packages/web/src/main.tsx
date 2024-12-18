import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider, ThemeProvider } from '@etu-access/lib';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider tokenType="USER">
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NextUIProvider>
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider, ThemeProvider } from '@etu-access/lib';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WindowLayout from './layout/window-layout';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <WindowLayout>
            <AuthProvider tokenType="ACCESS_POINT">
              <App />
            </AuthProvider>
          </WindowLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
);

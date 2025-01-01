import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider, ThemeProvider } from '@etu-access/lib';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WindowLayout from './layout/window-layout';
import CardReaderProvider from './provider/card-reader-provider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <WindowLayout>
            <AuthProvider tokenType="ACCESS_POINT">
              <CardReaderProvider>
                <App></App>
              </CardReaderProvider>
            </AuthProvider>
          </WindowLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
);

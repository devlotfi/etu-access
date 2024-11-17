import { createHashRouter, Navigate } from 'react-router-dom';
import {
  NotProtectedRoute,
  ProtectedRoute,
  SettingsPage,
  SignInPage,
} from '@etu-access/lib';
import DashboardLayout from './layout/dashboard-layout';
import HomePage from './pages/home-page';
import CardReaderPage from './pages/card-reader-page';
import AttendingStudentsListPage from './pages/attending-students-page';

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/sign-in"></Navigate>,
  },
  {
    path: '/sign-in',
    element: (
      <NotProtectedRoute>
        <SignInPage tokenType="ACCESS_POINT"></SignInPage>
      </NotProtectedRoute>
    ),
  },
  {
    path: '/dashboard/',
    element: (
      <ProtectedRoute>
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/dashboard/settings',
        element: <SettingsPage></SettingsPage>,
      },
      {
        path: '/dashboard/attending-students',
        element: <AttendingStudentsListPage></AttendingStudentsListPage>,
      },
      {
        path: '/dashboard/card-reader',
        element: <CardReaderPage></CardReaderPage>,
      },
    ],
  },
]);

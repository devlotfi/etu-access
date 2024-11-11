import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/dashboard-layout';
import DashboardProvider from './provider/dashboard-provider';
import UsersLayout from './layout/users-layout';
import UsersListPage from './pages/user/users-list-page';
import AddUserPage from './pages/user/add-user-page';
import UserDetailsPage from './pages/user/user-details-page';
import StudentsLayout from './layout/students-layout';
import StudentsListPage from './pages/student/students-list-page';
import AddStudentPage from './pages/student/add-student-page';
import StudentDetailsPage from './pages/student/student-details-page';
import AccessControlsListPage from './pages/access-controls/access-controls-list-page';
import AddAccessControlPage from './pages/access-controls/add-access-control-page';
import AccessControlDetailsPage from './pages/access-controls/access-control-details-page';
import AccessControlsLayout from './layout/access-controls-layout';
import {
  NotProtectedRoute,
  ProtectedRoute,
  SettingsPage,
  SignInPage,
} from '@etu-access/lib';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/sign-in"></Navigate>,
  },
  {
    path: '/sign-in',
    element: (
      <NotProtectedRoute>
        <SignInPage tokenType="USER"></SignInPage>
      </NotProtectedRoute>
    ),
  },
  {
    path: '/dashboard/',
    element: (
      <ProtectedRoute>
        <DashboardProvider>
          <DashboardLayout></DashboardLayout>
        </DashboardProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard/',
        element: <AccessControlsLayout></AccessControlsLayout>,
        children: [
          {
            path: '/dashboard/',
            element: <AccessControlsListPage></AccessControlsListPage>,
          },
          {
            path: '/dashboard/access-controls/add',
            element: <AddAccessControlPage></AddAccessControlPage>,
          },
          {
            path: '/dashboard/access-controls/:id',
            element: <AccessControlDetailsPage></AccessControlDetailsPage>,
          },
        ],
      },
      {
        path: '/dashboard/users',
        element: <UsersLayout></UsersLayout>,
        children: [
          {
            path: '/dashboard/users',
            element: <UsersListPage></UsersListPage>,
          },
          {
            path: '/dashboard/users/add',
            element: <AddUserPage></AddUserPage>,
          },
          {
            path: '/dashboard/users/:id',
            element: <UserDetailsPage></UserDetailsPage>,
          },
        ],
      },
      {
        path: '/dashboard/students',
        element: <StudentsLayout></StudentsLayout>,
        children: [
          {
            path: '/dashboard/students',
            element: <StudentsListPage></StudentsListPage>,
          },
          {
            path: '/dashboard/students/add',
            element: <AddStudentPage></AddStudentPage>,
          },
          {
            path: '/dashboard/students/:id',
            element: <StudentDetailsPage></StudentDetailsPage>,
          },
        ],
      },
      {
        path: '/dashboard/settings',
        element: <SettingsPage></SettingsPage>,
      },
    ],
  },
]);

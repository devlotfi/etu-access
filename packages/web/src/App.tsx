import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import {
  NotProtectedRoute,
  ProtectedRoute,
  SettingsPage,
  SignInPage,
} from '@etu-access/lib';
import DashboardLayout from './layout/dashboard-layout';
import DashboardProvider from './provider/dashboard-provider';
import AccessControlsLayout from './layout/access-controls-layout';
import AccessControlsListPage from './pages/access-controls/access-controls-list-page';
import AddAccessControlPage from './pages/access-controls/add-access-control-page';
import AccessControlDetailsPage from './pages/access-controls/access-control-details-page';
import UsersLayout from './layout/users-layout';
import UsersListPage from './pages/user/users-list-page';
import AddUserPage from './pages/user/add-user-page';
import UserDetailsPage from './pages/user/user-details-page';
import StudentsLayout from './layout/students-layout';
import StudentsListPage from './pages/student/students-list-page';
import AddStudentPage from './pages/student/add-student-page';
import StudentDetailsPage from './pages/student/student-details-page';

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen min-w-screen flex flex-col bg-background">
        <Routes>
          <Route index element={<Navigate to={'/sign-in'}></Navigate>}></Route>
          <Route
            path="sign-in"
            element={
              <NotProtectedRoute>
                <SignInPage tokenType="USER"></SignInPage>
              </NotProtectedRoute>
            }
          ></Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardProvider>
                  <DashboardLayout></DashboardLayout>
                </DashboardProvider>
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to={'/dashboard/access-controls'}></Navigate>}
            ></Route>

            <Route
              path="access-controls"
              element={<AccessControlsLayout></AccessControlsLayout>}
            >
              <Route
                index
                element={<AccessControlsListPage></AccessControlsListPage>}
              ></Route>
              <Route
                path="add"
                element={<AddAccessControlPage></AddAccessControlPage>}
              ></Route>
              <Route
                path=":id"
                element={<AccessControlDetailsPage></AccessControlDetailsPage>}
              ></Route>
            </Route>

            <Route path="users" element={<UsersLayout></UsersLayout>}>
              <Route index element={<UsersListPage></UsersListPage>}></Route>
              <Route path="add" element={<AddUserPage></AddUserPage>}></Route>
              <Route
                path=":id"
                element={<UserDetailsPage></UserDetailsPage>}
              ></Route>
            </Route>

            <Route path="students" element={<StudentsLayout></StudentsLayout>}>
              <Route
                index
                element={<StudentsListPage></StudentsListPage>}
              ></Route>
              <Route
                path="add"
                element={<AddStudentPage></AddStudentPage>}
              ></Route>
              <Route
                path=":id"
                element={<StudentDetailsPage></StudentDetailsPage>}
              ></Route>
            </Route>

            <Route
              path="settings"
              element={<SettingsPage></SettingsPage>}
            ></Route>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

import {
  NotProtectedRoute,
  ProtectedRoute,
  SettingsPage,
  SignInPage,
} from '@etu-access/lib';
import { HashRouter, Navigate, Route, Routes } from 'react-router';
import DashboardLayout from './layout/dashboard-layout';
import HomePage from './pages/home-page';
import AttendingStudentsListPage from './pages/attending-students-page';
import CardReaderPage from './pages/card-reader-page';

export default function App() {
  return (
    <HashRouter>
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route index element={<Navigate to={'/sign-in'}></Navigate>}></Route>
          <Route
            path="sign-in"
            element={
              <NotProtectedRoute>
                <SignInPage tokenType="ACCESS_POINT"></SignInPage>
              </NotProtectedRoute>
            }
          ></Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout></DashboardLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage></HomePage>}></Route>
            <Route
              path="settings"
              element={<SettingsPage></SettingsPage>}
            ></Route>
            <Route
              path="attending-students"
              element={<AttendingStudentsListPage></AttendingStudentsListPage>}
            ></Route>
            <Route
              path="card-reader"
              element={<CardReaderPage></CardReaderPage>}
            ></Route>
          </Route>
        </Routes>
      </main>
    </HashRouter>
  );
}

import { createContext } from 'react';

interface DashboardContext {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const DashboardContextInitialValue: DashboardContext = {
  sidebarOpen: true,
  setSidebarOpen() {},
};

export const DashboardContext = createContext(DashboardContextInitialValue);

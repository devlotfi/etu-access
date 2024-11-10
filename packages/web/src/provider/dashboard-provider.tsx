import { PropsWithChildren, useState } from 'react';
import { DashboardContext } from '../context/dashboard-context';

export default function DashboardProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard-navbar';
import DashboardSidebar from '../components/dashboard-sidebar';
import { useContext } from 'react';
import { cn } from '@nextui-org/react';
import { DashboardContext } from '../context/dashboard-context';

export default function DashboardLayout() {
  const { sidebarOpen } = useContext(DashboardContext);

  return (
    <div className="flex flex-1 bg-content2 relative overflow-x-hidden">
      <DashboardSidebar></DashboardSidebar>

      <div className="flex flex-col flex-1">
        <DashboardNavbar></DashboardNavbar>

        <div
          className={cn(
            'flex flex-col overflow-y-auto overflow-x-hidden max-w-[100vw] h-[calc(100vh-4rem)]',
            sidebarOpen && 'lg:max-w-[calc(100vw-18rem)]',
          )}
        >
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

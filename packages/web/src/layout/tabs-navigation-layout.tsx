import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';

export default function TabsNavigationLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex p-[0.5rem] space-x-3 sticky top-0 z-20 border-b border-divider bg-content2">
        {children}
      </div>
      <Outlet></Outlet>
    </div>
  );
}

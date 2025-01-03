import { PropsWithChildren } from 'react';
import TitleBar from '../components/titlebar';

export default function WindowLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-background">
      <TitleBar></TitleBar>
      <div className="flex flex-col h-[calc(100vh-2.5rem)] overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

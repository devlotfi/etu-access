import { RouterProvider } from 'react-router';
import { router } from './router';

export default function App() {
  return (
    <main className="flex flex-1 flex-col">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

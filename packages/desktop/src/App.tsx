import { SignInPage } from '@etu-access/lib';

export default function App() {
  return (
    <main className="flex flex-1 flex-col">
      <SignInPage refreshTokenMode="IN_MEMORY"></SignInPage>
    </main>
  );
}

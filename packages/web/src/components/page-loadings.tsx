import { Spinner } from '@nextui-org/react';

export default function PageLoading() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <Spinner color="primary" size="lg"></Spinner>
    </div>
  );
}

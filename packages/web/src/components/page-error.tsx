import { components, ErrorSVG } from '@etu-access/lib';

interface Props {
  error?: components['schemas']['ApiException'] | null;
}

export default function PageError({ error }: Props) {
  return (
    <div className="flex flex-1 flex-col space-y-3 justify-center items-center">
      <img className="h-[10rem]" src={ErrorSVG} alt="error" />
      <div className="flex">Error {error ? error.message : null}</div>
    </div>
  );
}

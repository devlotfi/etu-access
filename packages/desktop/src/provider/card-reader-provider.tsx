import { PropsWithChildren, useState } from 'react';
import { CardReaderContext } from '../context/card-reader-context';

export default function CardReaderProvider({ children }: PropsWithChildren) {
  const [portName, setPortName] = useState<string | null>(null);

  return (
    <CardReaderContext.Provider
      value={{
        portName,
        setPortName,
      }}
    >
      {children}
    </CardReaderContext.Provider>
  );
}

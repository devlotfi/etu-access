import { PropsWithChildren, useRef, useState } from 'react';
import { CardReaderContext } from '../context/card-reader-context';
import { SerialPortData } from '../types/port-data';

export default function CardReaderProvider({ children }: PropsWithChildren) {
  const [serialPortData, setSerialPortData] = useState<SerialPortData | null>(
    null,
  );
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);

  return (
    <CardReaderContext.Provider
      value={{
        serialPortData,
        setSerialPortData,
        readerRef,
      }}
    >
      {children}
    </CardReaderContext.Provider>
  );
}

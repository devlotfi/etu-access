import { createContext, MutableRefObject } from 'react';
import { SerialPortData } from '../types/port-data';

interface CardReaderContext {
  serialPortData: SerialPortData | null;
  setSerialPortData: (value: SerialPortData | null) => void;
  readerRef: MutableRefObject<ReadableStreamDefaultReader | null>;
}

const CardReaderContextInitialValue: CardReaderContext = {
  serialPortData: null,
  setSerialPortData() {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readerRef: {} as any,
};

export const CardReaderContext = createContext(CardReaderContextInitialValue);

import { createContext } from 'react';

interface CardReaderContext {
  portName: string | null;
  setPortName: (value: string | null) => void;
}

const CardReaderContextInitialValue: CardReaderContext = {
  portName: null,
  setPortName() {},
};

export const CardReaderContext = createContext(CardReaderContextInitialValue);

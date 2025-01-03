export {}; // Ensure this file is treated as a module

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      serialPortList: () => Promise<any[]>;
    };
  }
}

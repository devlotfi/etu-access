export {}; // Ensure this file is treated as a module

declare global {
  interface Window {
    electronAPI: {
      subscribeToMessages: (callback: any) => void;
    };
  }
}

//import { ElectronIPCMessages } from '@etu-access/ipc';
import { contextBridge, ipcRenderer } from 'electron';

//console.log('Hello---------', ElectronIPCMessages);

contextBridge.exposeInMainWorld('electronAPI', {
  subscribeToMessages: (callback: () => void) => {
    // Subscribe to a message from the main process
    ipcRenderer.on('message', () => {
      callback();
    });
  },
});

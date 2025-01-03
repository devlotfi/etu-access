import { ElectronIPCMessages } from '@etu-access/ipc';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send(ElectronIPCMessages.MINIMIZE),
  maximize: () => ipcRenderer.send(ElectronIPCMessages.MAXIMIZE),
  close: () => ipcRenderer.send(ElectronIPCMessages.CLOSE),
});

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('MINIMIZE'),
  maximize: () => ipcRenderer.send('MAXIMIZE'),
  close: () => ipcRenderer.send('CLOSE'),
  serialPortList: async (): Promise<any[]> =>
    await ipcRenderer.invoke('SERIAL_PORT_LIST'),
});

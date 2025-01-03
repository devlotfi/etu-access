import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { ElectronIPCMessages } from '../shared/electron-ipc-messages';
import { SerialPort } from 'serialport';

// Create a reference for the window so that it can be accessed later
// Function to create the main window
function createWindow() {
  // Create a new window instance
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load preload script
      nodeIntegration: false, // Prevents access to Node.js features from the renderer
      contextIsolation: true, // Isolates context between main and renderer process
    },
  });

  // Load your app's HTML file
  mainWindow.loadURL('http://localhost:1234'); // or 'file://path-to-your-index.html' for local files

  // Open DevTools in development mode
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:1234');
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

// Event listener when Electron finishes initialization
app.whenReady().then(() => {
  const mainWindow = createWindow();

  ipcMain.on(ElectronIPCMessages.MINIMIZE, () => {
    mainWindow.minimize();
  });
  ipcMain.on(ElectronIPCMessages.MAXIMIZE, () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on(ElectronIPCMessages.CLOSE, () => {
    mainWindow.close();
  });

  ipcMain.handle(ElectronIPCMessages.SERIAL_PORT_LIST, () => {
    return SerialPort.list();
  });

  // For macOS, create a window when the app is clicked if no other windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Event listener when all windows are closed (for Windows/Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

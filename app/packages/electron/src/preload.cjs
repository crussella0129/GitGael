const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
});

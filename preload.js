// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadURL: (url) => ipcRenderer.send('load-url', url),
    newTab: (url) => ipcRenderer.send('new-tab', url),
    setActiveTab: (index) => ipcRenderer.send('set-active-tab', index),
    addTab: (title, index) => ipcRenderer.on('add-tab', (event, title, index) => {
        document.dispatchEvent(new CustomEvent('add-tab', { detail: { title, index } }));
    })
});

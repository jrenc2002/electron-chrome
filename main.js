const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tabs = [];
let activeTab = 0;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            webviewTag: true
        }
    });
    
    mainWindow.loadFile('index.html');
    createTab('https://tieba.baidu.com/'); // 默认创建一个标签页
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createTab(url) {
    const view = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    
    view.webContents.loadURL(url);
    
    view.webContents.setWindowOpenHandler(({ url }) => {
        createTab(url); // 在新标签页中打开链接
        mainWindow.webContents.send('add-tab', 'New Tab', tabs.length - 1); // 通知渲染进程添加新的标签页
        return { action: 'deny' }; // 阻止默认的新窗口行为
    });
    
    mainWindow.addBrowserView(view);
    tabs.push(view);
    setActiveTab(tabs.length - 1);
    updateTabs();
}

function updateTabs() {
    const tabHeight = 60; // 标签栏 + 控件栏的总高度
    const tabWidth = mainWindow.getBounds().width;
    tabs.forEach((tab, index) => {
        if (index === activeTab) {
            tab.setBounds({ x: 0, y: tabHeight, width: tabWidth, height: mainWindow.getBounds().height - tabHeight });
            tab.setAutoResize({ width: true, height: true });
        } else {
            tab.setBounds({ x: 0, y: tabHeight, width: 0, height: 0 });
        }
    });
}

function setActiveTab(index) {
    activeTab = index;
    updateTabs();
}

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('load-url', (event, url) => {
    if (tabs[activeTab]) {
        tabs[activeTab].webContents.loadURL(url);
    }
});

ipcMain.on('new-tab', (event, url) => {
    createTab(url);
    mainWindow.webContents.send('add-tab', 'New Tab', tabs.length - 1);
});

ipcMain.on('set-active-tab', (event, index) => {
    setActiveTab(index);
});

ipcMain.on('go-back', () => {
    if (tabs[activeTab] && tabs[activeTab].webContents.canGoBack()) {
        tabs[activeTab].webContents.goBack();
    }
});

module.exports = { createTab, setActiveTab };

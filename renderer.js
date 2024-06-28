const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs');
    const urlInput = document.getElementById('url');
    
    document.getElementById('load-url').addEventListener('click', () => {
        const url = urlInput.value;
        ipcRenderer.send('load-url', url);
    });
    
    document.getElementById('new-tab').addEventListener('click', () => {
        const url = 'https://tieba.baidu.com/';
        ipcRenderer.send('new-tab', url);
    });
    
    document.getElementById('back').addEventListener('click', () => {
        ipcRenderer.send('go-back');
    });
    
    ipcRenderer.on('add-tab', (event, title, index) => {
        addTab(title, index);
    });
    
    function addTab(title, index) {
        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.textContent = title;
        tab.dataset.index = index;
        tab.addEventListener('click', () => {
            ipcRenderer.send('set-active-tab', index);
            setActiveTabElement(tab);
        });
        tabsContainer.appendChild(tab);
        setActiveTabElement(tab);
    }
    
    function setActiveTabElement(tab) {
        const tabs = tabsContainer.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    }
    
    // 创建第一个默认标签页
    addTab('Example Domain', 0);
});

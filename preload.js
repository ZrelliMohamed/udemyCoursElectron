const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setclient: (client) => ipcRenderer.send('set-client', client),
  getclient: (channel,func) => ipcRenderer.on("get-client",(event,...args)=>{
    func(...args);
  }),
})
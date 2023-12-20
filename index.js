const electron = require("electron")
const path = require('node:path')
// Module to control application life.
const { app, BrowserWindow, Menu } = electron;
let win
let addWin
var clientId = 0
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    })
    win.on('closed', () => app.quit())
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu);
    win.loadFile('main.html')
}


app.whenReady().then(() => {

    createWindow()
})

electron.ipcMain.on("set-client", (event, client) => {
    console.log({ ...client, clientId });
    let cli ={ ...client, clientId }
    win.webContents.send("get-client", cli)
    clientId += 1
    if (instance > 0) instance -= 1
    addWin.close()
    console.log(instance);

})

const createAddWindow = () => {
    addWin = new BrowserWindow({
        width: 500, height: 600, centerScreen: true,
        title: 'Add new Todo',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    });
    addWin.loadFile('add.html')
    addWin.on('close', () => {
        addWin = null
        if (instance > 0) instance -= 1
    }
    )
}
var instance = 0
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Todo", click() {
                    if (instance === 0) {
                        createAddWindow();
                        instance += 1
                    }
                }
            },
            { label: "Exit", accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q", click() { app.quit(); } }
        ]
    }
]


// with this code every window u can acces to devtools to debug your code
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle DevTools",
                accelerator: process.platform == 'darwin' ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
        ]
    });
}
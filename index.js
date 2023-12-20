const electron = require("electron")
// Module to control application life.
const { app, BrowserWindow, Menu } = electron;
// we did this declaration to avoid the scope issue 
let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        title: 'TODO APP',
       
    })
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed',()=> app.quit())
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu);
})

const createAddWindow = () => {
    addWin = new BrowserWindow({
        width: 300, height: 200, centerScreen: true,
        title: 'Add new Todo',
        autoHideMenuBar: true,
    });
    addWin.loadURL(`file://${__dirname}/add.html`)
}
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Todo", click() {
                    createAddWindow();
                }
            },
            { label: "Exit", accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q", click() { app.quit() } }
        ]
    }
]


// with this code every window u can acces to devtools to debug your code
if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: "Developer Tools",
        submenu:[
            {label:"Toggle DevTools",
            accelerator: process.platform == 'darwin' ? "Command+I" : "Ctrl+I",
        click(item,focusedWindow){
            focusedWindow.toggleDevTools()
        }
        },
        ]
    });
}
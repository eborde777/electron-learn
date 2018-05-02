const electron = require('electron')
const{app, BrowserWindow} = electron

const path = require('path')
const url = require('url')

let win = null

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.webContents.openDevTools()
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
};

app.on('ready', createWindow)

let pyProc = null

const selectPort = () => {
  pyPort = 4242
  return pyPort
}

const createProc = () => {
  port = '' + selectPort()
  pyProc = require('child_process').spawn('python', ['hello.py'])

 if (pyProc != null) {
   console.log("child process success")
 }
}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
}

app.on('ready', createProc)
app.on('will-quit', exitPyProc)

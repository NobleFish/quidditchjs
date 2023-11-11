const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 845,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js')
      
    }
  })
  
  win.loadFile('src/req/html/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
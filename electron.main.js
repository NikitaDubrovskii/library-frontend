'use strict'

const electron = require('electron')
const app = electron.app
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow
var kill = require('tree-kill');

app.setName(config.productName)
var mainWindow = null

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: config.productName,
        //show: false,
        width: 1500,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        }
    })

    var jarPath = 'resources/jar/library-backend-0.0.1-SNAPSHOT.jar'; // работает

    var child = require('child_process').spawn(
        'java', ['-jar', jarPath, '']
    )

    setTimeout(function () {
        mainWindow.loadFile('dist/library/index.html')
    }, 5000)

    mainWindow.once('ready-to-show', () => {
        mainWindow.setMenu(null)
        mainWindow.show()
        console.log(child.pid)
    })

    mainWindow.onbeforeunload = (e) => {
        e.returnValue = false
    }

    mainWindow.on('closed', function () {
        kill(child.pid);
        mainWindow = null
    })

})

app.on('window-all-closed', () => {
    app.quit()
})



const path = require('path')
const url = require('url')
const {app, BrowserWindow, protocol} = require('electron')
const express = require('express')
const server = express()

let win; 

function serverSide(){
    server.get('/main', (req, res)=>{
        res.end('ok1')
    })

    

    server.listen('3000')
}

function createWindow(){
    win = new BrowserWindow(
        {
            width: 700,
            height: 500,
            icon: __dirname + '/img/nar.jpg'
        }
    )

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), 
        protocol: 'file:', 
        slashes: true
    }))

    //win.webContents.openDevTools()

    serverSide()

    win.on('closed', ()=>{
        win = 'null'
    })
    
    
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
    app.quit()
})
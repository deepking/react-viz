var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var MenuItem = require('menu-item');


// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
  killMeteor();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, 'node-integration': false});

  // and load the index.html of the app.
  mainWindow.loadUrl('http://localhost:3000/');

  // var menu = new Menu();
  // menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
  // menu.append(new MenuItem({ type: 'separator' }));
  // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
  // mainWindow.addEventListener('contextmenu', function (e) {
  //     e.preventDefault();
  //       menu.popup(remote.getCurrentWindow());
  // }, false);
  

var template = [{
      label: 'Electron',
      submenu: [{
        label: 'About Electron',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide Electron',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          app.quit();
        }
      }, ]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }, ]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      }, ]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }, ]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click: function() {
          require('shell').openExternal('http://electron.atom.io')
        }
      }, {
        label: 'Documentation',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme')
        }
      }, {
        label: 'Community Discussions',
        click: function() {
          require('shell').openExternal('https://discuss.atom.io/c/electron')
        }
      }, {
        label: 'Search Issues',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/issues')
        }
      }]
    }];

    // menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function killMeteor(){
  var canKillMeteor = process.env.KILL_METEOR_ON_EXIT;
  var meteorPID = process.env.METEOR_PARENT_PID;

  if(!canKillMeteor)
    return;

  process.kill(meteorPID, 'SIGKILL');
}

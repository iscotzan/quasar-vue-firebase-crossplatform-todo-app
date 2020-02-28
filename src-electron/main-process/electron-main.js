import { app, BrowserWindow, nativeTheme, Menu, ipcMain } from "electron";
import { menuTemplate } from "./electron-main-menu-template";
try {
  if (
    process.platform === "win32" &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require("fs").unlinkSync(
      require("path").join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require("path")
    .join(__dirname, "statics")
    .replace(/\\/g, "\\\\");
}
/**
 * Variables & Constants
 */
export let mainWindow;

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
/**
 * App Ready
 */

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    minHeight: 500,
    minWidth: 800,
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
/**
 * App Events
 */

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

/**
 * Ipc Events
 */

ipcMain.on("quit-app", () => {
  app.quit();
});

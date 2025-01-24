import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, type ElectronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}
export const api = {
  sendMessage(message: string): Promise<unknown> {
    return ipcRenderer.invoke('send-message', message)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

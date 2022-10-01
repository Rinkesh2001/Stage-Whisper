import { ipcRenderer, contextBridge } from 'electron';
// import { languages } from '../src/components/language/languages';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

// Arguments to be passed to the Whisper AI python script
export interface whisperArgs {
  file: string;
  model: 'tiny' | 'base' | 'small' | 'medium' | 'large';
  language: string;
  translate: boolean;
  output_dir: string;
  // detect_language: boolean;
  // output_format: string;
}

const api = {
  runWhisper: (args: whisperArgs) => {
    ipcRenderer.invoke('run-whisper', args);
  },

  openDirectoryDialog: async () => {
    const result = await ipcRenderer.invoke('open-directory-dialog');
    return result;
  },

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },

  loadVttFromFile: async (path: string, exampleData?: boolean) => {
    if (exampleData === true) {
      const result = await ipcRenderer.invoke('load-vtt-from-file', path, exampleData);

      return result;
    } else {
      const result = await ipcRenderer.invoke('load-vtt-from-file', path);

      return result;
    }
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
};
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

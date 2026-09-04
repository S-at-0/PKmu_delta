import { App, TFile } from 'obsidian';

declare global {
    interface Window {
        syzygy: (targStamp: any) => Promise<any[]>;
    }

    const self: Window & typeof globalThis & {
        require: {
            (path: string): any;
            import: (path: string) => Promise<any>;
        }
    };

    const app: App;
}
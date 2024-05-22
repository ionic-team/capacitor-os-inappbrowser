/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin } from '@capacitor/core';

import type { InAppBrowserPlugin, SystemBrowserOptions, WebViewOptions } from './definitions';

export class InAppBrowserWeb extends WebPlugin implements InAppBrowserPlugin {
  //@ts-expect-error unused
  openInWebView(url: string, options: WebViewOptions): void {
    throw this.unimplemented('Not implemented on web.');
  }
  //@ts-expect-error unused
  openInSystemBrowser(url: string, options: SystemBrowserOptions): void {
    throw this.unimplemented('Not implemented on web.');
  }
  //@ts-expect-error unused
  openInExternalBrowser(url: string): void {
    throw this.unimplemented('Not implemented on web.');
  }
  close(): void {
    throw this.unimplemented('Not implemented on web.');
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin } from '@capacitor/core';

import type {
  InAppBrowserPlugin,
  OpenInWebViewParameterModel,
  OpenInSystemBrowserParameterModel,
  OpenInDefaultParameterModel,
} from './definitions';

export class InAppBrowserWeb extends WebPlugin implements InAppBrowserPlugin {
  //@ts-ignore
  openInWebView(model: OpenInWebViewParameterModel): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
  //@ts-ignore
  openInSystemBrowser(model: OpenInSystemBrowserParameterModel): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
  //@ts-ignore
  openInExternalBrowser(model: OpenInDefaultParameterModel): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
  //@ts-ignore
  close(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}

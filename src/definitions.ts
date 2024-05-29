import type { PluginListenerHandle } from '@capacitor/core';

export enum ToolbarPosition {
  TOP,
  BOTTOM
}

export enum iOSViewStyle {
  PAGE_SHEET,
  FORM_SHEET,
  FULL_SCREEN
}

export enum AndroidViewStyle {
  BOTTOM_SHEET,
  FULL_SCREEN
}

export enum iOSAnimation {
  FLIP_HORIZONTAL,
  CROSS_DISSOLVE,
  COVER_VERTICAL
}

export enum AndroidAnimation {
  FADE_IN,
  FADE_OUT,
  SLIDE_IN_LEFT,
  SLIDE_OUT_RIGHT  
}


export interface WebViewOptions {
  showURL: boolean;
  showToolbar: boolean;

  clearCache: boolean;
  clearSessionCache: boolean;
  mediaPlaybackRequiresUserAction: boolean;
  
  closeButtonText: string;
  toolbarPosition: ToolbarPosition;
  
  showNavigationButtons: boolean;
  leftToRight: boolean;
  
  android: AndroidWebViewOptions,
  iOS: iOSWebViewOptions
}

export interface iOSWebViewOptions {
  allowOverScroll: boolean;

  enableViewportScale: boolean;
  allowInLineMediaPlayback: boolean;
  keyboardDisplayRequiresUserAction: boolean;
  surpressIncrementalRendering: boolean;
  
  viewStyle: iOSViewStyle;
  animation: iOSAnimation;
}

export interface AndroidWebViewOptions {
  allowZoom: boolean;
  hardwareBack: boolean;
  pauseMedia: boolean;
}

export enum DismissStyle {
  CLOSE,
  CANCEL,
  DONE
}

export interface SystemBrowserOptions {
  android: AndroidSystemBrowserOptions,
  iOS: iOSSystemBrowserOptions
}

export interface iOSSystemBrowserOptions {
  closeButtonText: DismissStyle;
  viewStyle: iOSViewStyle;
  animationEffect: iOSAnimation;
  enableBarsCollapsing: boolean;
  enableReadersMode: boolean;
}

export interface AndroidBottomSheet {
  height: number;
  isFixed: boolean;
}

export interface AndroidSystemBrowserOptions {
  showTitle: boolean;

  hideToolbarOnScroll: boolean;
  viewStyle: AndroidViewStyle;
  
  bottomSheetOptions?: AndroidBottomSheet;
  
  startAnimation: AndroidAnimation;
  exitAnimation: AndroidAnimation;
}

/**
 * Defines the options for opening a URL in the external browser and used by the others.
 */
export interface OpenInDefaultParameterModel {
  url: string;
}

/**
 * Defines the options for opening a URL in the syste, browser.
 */
export interface OpenInSystemBrowserParameterModel extends OpenInDefaultParameterModel {
  options: SystemBrowserOptions;
}

export interface InAppBrowserPlugin {
  openInWebView(url: string, options: WebViewOptions): void;
  openInSystemBrowser(model: OpenInSystemBrowserParameterModel): void;
  openInExternalBrowser(model: OpenInDefaultParameterModel): void;
  close(): void;
  removeAllListeners(): void;
  addListener(eventName: 'browserClosed' | 'browserPageLoaded', listenerFunc: () => void): Promise<PluginListenerHandle>;
}

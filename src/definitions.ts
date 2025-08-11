import type { PluginListenerHandle } from '@capacitor/core';

export enum ToolbarPosition {
  TOP,
  BOTTOM,
}

export enum iOSViewStyle {
  PAGE_SHEET,
  FORM_SHEET,
  FULL_SCREEN,
}

export enum AndroidViewStyle {
  BOTTOM_SHEET,
  FULL_SCREEN,
}

export enum iOSAnimation {
  FLIP_HORIZONTAL,
  CROSS_DISSOLVE,
  COVER_VERTICAL,
}

export enum AndroidAnimation {
  FADE_IN,
  FADE_OUT,
  SLIDE_IN_LEFT,
  SLIDE_OUT_RIGHT,
}

export interface WebViewOptions {
  /** Displays the URL on the Web View. */
  showURL: boolean;
  /** Displays the toolbar on the Web View. */
  showToolbar: boolean;

  /** Clears the Web View's cookie cache before a new window is opened. */
  clearCache: boolean;
  /** Clears the session cookie cache before a new window is opened. */
  clearSessionCache: boolean;
  /** Prevents HTML5 audio or video from auto-playing. */
  mediaPlaybackRequiresUserAction: boolean;

  /** Sets the text to display on the Close button on the Web View. */
  closeButtonText: string;
  /** Sets the position to display the Toolbar on the Web View. */
  toolbarPosition: ToolbarPosition;

  /** Displays the navigation buttons. */
  showNavigationButtons: boolean;
  /** Swaps the positions of the navigation buttons and the close button. */
  leftToRight: boolean;

  /** Sets a custom user agent to open the Web View with. If empty or not set, the parameter will be ignored. */
  customWebViewUserAgent?: string | null;

  /** Android-specific Web View options. */
  android: AndroidWebViewOptions;
  /** iOS-specific Web View options. */
  iOS: iOSWebViewOptions;
}

export interface iOSWebViewOptions {
  /** Turns on the Web View bounce property. */
  allowOverScroll: boolean;

  /** Prevents viewport scaling through a meta tag. */
  enableViewportScale: boolean;
  /** Allows in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. Note: The HTML's video element must also include the webkit-playsinline attribute. */
  allowInLineMediaPlayback: boolean;
  /** Waits until all new view content is received before being rendered. */
  surpressIncrementalRendering: boolean;

  /** Sets the presentation style of the Web View. */
  viewStyle: iOSViewStyle;
  /** Sets the transition style of the Web View. */
  animationEffect: iOSAnimation;

  /** Enables back and forward swipe gestures in the Web View. */
  allowsBackForwardNavigationGestures: boolean;
}

export interface AndroidWebViewOptions {
  /** Shows the Android browser's zoom controls. */
  allowZoom: boolean;
  /** Uses the hardware back button to navigate backwards through the Web View's history. If there is no previous page, the Web View will close. */
  hardwareBack: boolean;
  /** Makes the Web View pause/resume with the app to stop background audio. */
  pauseMedia: boolean;
}

export enum DismissStyle {
  CLOSE,
  CANCEL,
  DONE,
}

export interface SystemBrowserOptions {
  /** Android-specific System Browser options. */
  android: AndroidSystemBrowserOptions;
  /** iOS-specific System Browser options. */
  iOS: iOSSystemBrowserOptions;
}

export interface iOSSystemBrowserOptions {
  /** Sets a text to use as the close button's caption. */
  closeButtonText: DismissStyle;
  /** Sets the presentation style of SafariViewController. */
  viewStyle: iOSViewStyle;
  /** Sets the transition style of SafariViewController. */
  animationEffect: iOSAnimation;
  /** Enables bars to collapse on scrolling down. */
  enableBarsCollapsing: boolean;
  /** Enables readers mode. */
  enableReadersMode: boolean;
}

export interface AndroidBottomSheet {
  /** Sets the height of the bottom sheet, in pixels.
   * Custom tabs will set the bottom height to at least 50% of the screen.
   * If no value is passed, it will default to the minimum value. */
  height: number;
  /** Sets whether the bottom sheet is fixed. */
  isFixed: boolean;
}

export interface AndroidSystemBrowserOptions {
  /** Enables the title display. */
  showTitle: boolean;

  /** Hides the toolbar when scrolling. */
  hideToolbarOnScroll: boolean;
  /** Sets the presentation style of CustomTabs. */
  viewStyle: AndroidViewStyle;

  /** Sets the options for the bottom sheet when this is selected as the viewStyle. If viewStyle is FULL_SCREEN, this will be ignored. */
  bottomSheetOptions?: AndroidBottomSheet;

  /** Sets the start animation for when the browser appears. */
  startAnimation: AndroidAnimation;
  /** Sets the exit animation for when the browser disappears. */
  exitAnimation: AndroidAnimation;
}

/**
 * Defines the options for opening a URL in the external browser and used by the others.
 */
export interface OpenInDefaultParameterModel {
  /** The URL to be opened. It must contain either 'http' or 'https' as the protocol prefix. */
  url: string;
}

/**
 * Defines the options for opening a URL in the system browser.
 */
export interface OpenInSystemBrowserParameterModel extends OpenInDefaultParameterModel {
  /** A structure containing some configurations to apply to the System Browser. */
  options: SystemBrowserOptions;
}

/**
 * Defines the options for opening a URL in the web view.
 */
export interface OpenInWebViewParameterModel extends OpenInDefaultParameterModel {
  /** A structure containing some configurations to apply to the Web View. */
  options: WebViewOptions;
  /** A map of custom headers to be sent with the request. */
  customHeaders?: { [key: string]: string };
}

/**
 * Defines the data for the 'browserPageNavigationCompleted' event.
 */
export interface BrowserPageNavigationCompletedEventData {
  /** The URL of the page that was loaded. */
  url: string | undefined;
}

export interface InAppBrowserPlugin {
  /**
   * Opens the web content of the given URL in your mobile app using a custom web view within your application.
   * @param model The parameters to open the URL in the web view
   */
  openInWebView(model: OpenInWebViewParameterModel): Promise<void>;

  /**
   * Opens the web content of the given URL in your mobile app, using SafariViewController for iOS and Custom Tabs for Android.
   * @param model The parameters to open the URL in the system browser
   */
  openInSystemBrowser(model: OpenInSystemBrowserParameterModel): Promise<void>;

  /**
   * Opens the web content of the given URL in a separate browser, outside of your mobile application.
   * @param model The parameters to open the URL in the external browser
   */
  openInExternalBrowser(model: OpenInDefaultParameterModel): Promise<void>;

  /**
   * Closes the currently active browser. It can be used to close browsers launched through the openInSystemBrowser or openInWebView actions.
   */
  close(): Promise<void>;

  /**
   * Adds a listener for the specified browser events, with no data being returned.
   * @param eventName The name of the browser event to listen for: 'browserClosed' or 'browserPageLoaded'.
   * @param listenerFunc The function to be called when the event occurs.
   */
  addListener(
    eventName: 'browserClosed' | 'browserPageLoaded',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Adds a listener for the specified browser event, which receives data.
   * @param eventName The name of the browser event to listen for: 'browserPageNavigationCompleted'. Applies only to openInWebView.
   * @param listenerFunc The function to be called when the event occurs.
   */
  addListener(
    eventName: 'browserPageNavigationCompleted',
    listenerFunc: (data: BrowserPageNavigationCompletedEventData) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Removes all listeners for the browser events.
   */
  removeAllListeners(): void;
}

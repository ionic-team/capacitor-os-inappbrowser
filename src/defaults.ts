import { AndroidAnimation, AndroidSystemBrowserOptions, AndroidViewStyle, AndroidWebViewOptions, DismissStyle, SystemBrowserOptions, ToolbarPosition, WebViewOptions, iOSAnimation, iOSSystemBrowserOptions, iOSViewStyle, iOSWebViewOptions } from "./definitions"

export const DefaultAndroidWebViewOptions: AndroidWebViewOptions = {
    allowZoom: false,
    hardwareBack: true,
    pauseMedia: true
}
  
export const DefaultiOSWebViewOptions: iOSWebViewOptions = {
    allowOverScroll: true,

    enableViewportScale: false,
    allowInLineMediaPlayback: false,
    surpressIncrementalRendering: false,

    viewStyle: iOSViewStyle.FULL_SCREEN,
    animationEffect: iOSAnimation.COVER_VERTICAL
}

export const DefaultWebViewOptions: WebViewOptions = {
    showToolbar: true,
    showURL: true,

    clearCache: true,
    clearSessionCache: true,
    mediaPlaybackRequiresUserAction: false,

    closeButtonText: "Close",
    toolbarPosition: ToolbarPosition.TOP,

    showNavigationButtons: true,
    leftToRight: false,

    android: DefaultAndroidWebViewOptions,
    iOS: DefaultiOSWebViewOptions
}

export const DefaultiOSSystemBrowserOptions: iOSSystemBrowserOptions = {
    closeButtonText: DismissStyle.DONE,
    viewStyle: iOSViewStyle.FULL_SCREEN,
    animationEffect: iOSAnimation.COVER_VERTICAL,
    enableBarsCollapsing: true,
    enableReadersMode: false
}


export const DefaultAndroidSystemBrowserOptions: AndroidSystemBrowserOptions = {
    showTitle: false,
    hideToolbarOnScroll: false,
    viewStyle: AndroidViewStyle.BOTTOM_SHEET,
    
    startAnimation: AndroidAnimation.FADE_IN,
    exitAnimation: AndroidAnimation.FADE_OUT
}
   
export const DefaultSystemBrowserOptions: SystemBrowserOptions = {
    android: DefaultAndroidSystemBrowserOptions,
    iOS: DefaultiOSSystemBrowserOptions
}
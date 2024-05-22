# @capacitor/os-inappbrowser

in app browser

## Install

```bash
npm install @capacitor/os-inappbrowser
npx cap sync
```

## API

<docgen-index>

* [`openInWebView(...)`](#openinwebview)
* [`openInSystemBrowser(...)`](#openinsystembrowser)
* [`openInExternalBrowser(...)`](#openinexternalbrowser)
* [`close()`](#close)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openInWebView(...)

```typescript
openInWebView(url: string, options: WebViewOptions) => void
```

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`url`**     | <code>string</code>                                       |
| **`options`** | <code><a href="#webviewoptions">WebViewOptions</a></code> |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(url: string, options: SystemBrowserOptions) => void
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`url`**     | <code>string</code>                                                   |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(url: string) => void
```

| Param     | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

--------------------


### close()

```typescript
close() => void
```

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

--------------------


### addListener('browserClosed' | 'browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserClosed' | 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                |
| ------------------ | --------------------------------------------------- |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>                          |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### WebViewOptions

| Prop                  | Type                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| **`showURL`**         | <code>boolean</code>                                                    |
| **`showToolBar`**     | <code>boolean</code>                                                    |
| **`closeButtonText`** | <code>string</code>                                                     |
| **`toolbarPosition`** | <code><a href="#toolbarposition">ToolbarPosition</a></code>             |
| **`leftToRight`**     | <code>boolean</code>                                                    |
| **`android`**         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> |
| **`iOS`**             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         |


#### AndroidWebViewOptions

| Prop               | Type                 |
| ------------------ | -------------------- |
| **`allowZoom`**    | <code>boolean</code> |
| **`hardwareBack`** | <code>boolean</code> |
| **`pauseMedia`**   | <code>boolean</code> |


#### iOSWebViewOptions

| Prop                                    | Type                                                  |
| --------------------------------------- | ----------------------------------------------------- |
| **`allowOverScroll`**                   | <code>boolean</code>                                  |
| **`enableViewportScale`**               | <code>boolean</code>                                  |
| **`allowInLineMediaPlayback`**          | <code>boolean</code>                                  |
| **`keyboardDisplayRequiresUserAction`** | <code>boolean</code>                                  |
| **`surpressedIncrementalRendering`**    | <code>boolean</code>                                  |
| **`viewStyle`**                         | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**                   | <code><a href="#iosanimation">iOSAnimation</a></code> |


#### SystemBrowserOptions

| Prop             | Type                                                                                |
| ---------------- | ----------------------------------------------------------------------------------- |
| **`showURLBar`** | <code>boolean</code>                                                                |
| **`android`**    | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> |
| **`iOS`**        | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         |


#### AndroidSystemBrowserOptions

| Prop                      | Type                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| **`showTitle`**           | <code>boolean</code>                                              |
| **`hideToolbarOnScroll`** | <code>boolean</code>                                              |
| **`viewStyle`**           | <code><a href="#androidviewstyle">AndroidViewStyle</a></code>     |
| **`bottomSheetOptions`**  | <code><a href="#androidbottomsheet">AndroidBottomSheet</a></code> |
| **`startAnimation`**      | <code><a href="#androidanimation">AndroidAnimation</a></code>     |
| **`exitAnimation`**       | <code><a href="#androidanimation">AndroidAnimation</a></code>     |


#### AndroidBottomSheet

| Prop          | Type                |
| ------------- | ------------------- |
| **`height`**  | <code>number</code> |
| **`isFixed`** | <code>number</code> |


#### iOSSystemBrowserOptions

| Prop                       | Type                                                  |
| -------------------------- | ----------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  |
| **`enableReadersMode`**    | <code>boolean</code>                                  |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Enums


#### ToolbarPosition

| Members      |
| ------------ |
| **`TOP`**    |
| **`BOTTOM`** |


#### iOSViewStyle

| Members           |
| ----------------- |
| **`PAGE_SHEET`**  |
| **`FORM_SHEET`**  |
| **`FULL_SCREEN`** |


#### iOSAnimation

| Members               |
| --------------------- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`**  |
| **`COVER_VERTICAL`**  |


#### AndroidViewStyle

| Members            |
| ------------------ |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`**  |


#### AndroidAnimation

| Members                                  |
| ---------------------------------------- |
| **`FADE_IN`**                            |
| **`FADE_OUT`**                           |
| **`LINEAR_INTERPOLATION`**               |
| **`ACCELERATE_DECELERATE_INTERPOLATOR`** |
| **`ACCELERATE_INTERPOLATOR`**            |
| **`ANTICIPATE_INTERPOLATOR`**            |
| **`ANTICIPATE_OVERSHOOT_INTERPOLATOR`**  |
| **`BOUNCE_INTERPOLATOR`**                |
| **`DECELERATE_INTERPOLATOR`**            |
| **`OVERSHOOT_INTERPOLATOR`**             |
| **`SLIDE_IN_LEFT`**                      |
| **`SLIDE_OUT_RIGHT`**                    |


#### DismissStyle

| Members      |
| ------------ |
| **`CLOSE`**  |
| **`CANCEL`** |
| **`DONE`**   |

</docgen-api>

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
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

| Param       | Type                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openinwebviewparametermodel">OpenInWebViewParameterModel</a></code> |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

| Param       | Type                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openinsystembrowserparametermodel">OpenInSystemBrowserParameterModel</a></code> |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

| Param       | Type                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openindefaultparametermodel">OpenInDefaultParameterModel</a></code> |

--------------------


### close()

```typescript
close() => Promise<void>
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


#### OpenInWebViewParameterModel

Defines the options for opening a URL in the web view.

| Prop          | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#webviewoptions">WebViewOptions</a></code> |


#### WebViewOptions

| Prop                                  | Type                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------- |
| **`showURL`**                         | <code>boolean</code>                                                    |
| **`showToolbar`**                     | <code>boolean</code>                                                    |
| **`clearCache`**                      | <code>boolean</code>                                                    |
| **`clearSessionCache`**               | <code>boolean</code>                                                    |
| **`mediaPlaybackRequiresUserAction`** | <code>boolean</code>                                                    |
| **`closeButtonText`**                 | <code>string</code>                                                     |
| **`toolbarPosition`**                 | <code><a href="#toolbarposition">ToolbarPosition</a></code>             |
| **`showNavigationButtons`**           | <code>boolean</code>                                                    |
| **`leftToRight`**                     | <code>boolean</code>                                                    |
| **`customWebViewUserAgent`**          | <code><a href="#string">String</a> \| null</code>                       |
| **`android`**                         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> |
| **`iOS`**                             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         |


#### String

Allows manipulation and formatting of text strings and determination and location of substrings within strings.

| Prop         | Type                | Description                                                  |
| ------------ | ------------------- | ------------------------------------------------------------ |
| **`length`** | <code>number</code> | Returns the length of a <a href="#string">String</a> object. |

| Method                | Signature                                                                                                                      | Description                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**          | () =&gt; string                                                                                                                | Returns a string representation of a string.                                                                                                  |
| **charAt**            | (pos: number) =&gt; string                                                                                                     | Returns the character at the specified index.                                                                                                 |
| **charCodeAt**        | (index: number) =&gt; number                                                                                                   | Returns the Unicode value of the character at the specified location.                                                                         |
| **concat**            | (...strings: string[]) =&gt; string                                                                                            | Returns a string that contains the concatenation of two or more strings.                                                                      |
| **indexOf**           | (searchString: string, position?: number \| undefined) =&gt; number                                                            | Returns the position of the first occurrence of a substring.                                                                                  |
| **lastIndexOf**       | (searchString: string, position?: number \| undefined) =&gt; number                                                            | Returns the last occurrence of a substring in the string.                                                                                     |
| **localeCompare**     | (that: string) =&gt; number                                                                                                    | Determines whether two strings are equivalent in the current locale.                                                                          |
| **match**             | (regexp: string \| <a href="#regexp">RegExp</a>) =&gt; <a href="#regexpmatcharray">RegExpMatchArray</a> \| null                | Matches a string with a regular expression, and returns an array containing the results of that search.                                       |
| **replace**           | (searchValue: string \| <a href="#regexp">RegExp</a>, replaceValue: string) =&gt; string                                       | Replaces text in a string, using a regular expression or search string.                                                                       |
| **replace**           | (searchValue: string \| <a href="#regexp">RegExp</a>, replacer: (substring: string, ...args: any[]) =&gt; string) =&gt; string | Replaces text in a string, using a regular expression or search string.                                                                       |
| **search**            | (regexp: string \| <a href="#regexp">RegExp</a>) =&gt; number                                                                  | Finds the first substring match in a regular expression search.                                                                               |
| **slice**             | (start?: number \| undefined, end?: number \| undefined) =&gt; string                                                          | Returns a section of a string.                                                                                                                |
| **split**             | (separator: string \| <a href="#regexp">RegExp</a>, limit?: number \| undefined) =&gt; string[]                                | Split a string into substrings using the specified separator and return them as an array.                                                     |
| **substring**         | (start: number, end?: number \| undefined) =&gt; string                                                                        | Returns the substring at the specified location within a <a href="#string">String</a> object.                                                 |
| **toLowerCase**       | () =&gt; string                                                                                                                | Converts all the alphabetic characters in a string to lowercase.                                                                              |
| **toLocaleLowerCase** | (locales?: string \| string[] \| undefined) =&gt; string                                                                       | Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.                                   |
| **toUpperCase**       | () =&gt; string                                                                                                                | Converts all the alphabetic characters in a string to uppercase.                                                                              |
| **toLocaleUpperCase** | (locales?: string \| string[] \| undefined) =&gt; string                                                                       | Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. |
| **trim**              | () =&gt; string                                                                                                                | Removes the leading and trailing white space and line terminator characters from a string.                                                    |
| **substr**            | (from: number, length?: number \| undefined) =&gt; string                                                                      | Gets a substring beginning at the specified location and having the specified length.                                                         |
| **valueOf**           | () =&gt; string                                                                                                                | Returns the primitive value of the specified object.                                                                                          |


#### RegExpMatchArray

| Prop        | Type                |
| ----------- | ------------------- |
| **`index`** | <code>number</code> |
| **`input`** | <code>string</code> |


#### RegExp

| Prop             | Type                 | Description                                                                                                                                                          |
| ---------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`source`**     | <code>string</code>  | Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. |
| **`global`**     | <code>boolean</code> | Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.                                     |
| **`ignoreCase`** | <code>boolean</code> | Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.                                 |
| **`multiline`**  | <code>boolean</code> | Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.                                  |
| **`lastIndex`**  | <code>number</code>  |                                                                                                                                                                      |

| Method      | Signature                                                                     | Description                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **exec**    | (string: string) =&gt; <a href="#regexpexecarray">RegExpExecArray</a> \| null | Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search. |
| **test**    | (string: string) =&gt; boolean                                                | Returns a Boolean value that indicates whether or not a pattern exists in a searched string.                                  |
| **compile** | () =&gt; this                                                                 |                                                                                                                               |


#### RegExpExecArray

| Prop        | Type                |
| ----------- | ------------------- |
| **`index`** | <code>number</code> |
| **`input`** | <code>string</code> |


#### AndroidWebViewOptions

| Prop               | Type                 |
| ------------------ | -------------------- |
| **`allowZoom`**    | <code>boolean</code> |
| **`hardwareBack`** | <code>boolean</code> |
| **`pauseMedia`**   | <code>boolean</code> |


#### iOSWebViewOptions

| Prop                               | Type                                                  |
| ---------------------------------- | ----------------------------------------------------- |
| **`allowOverScroll`**              | <code>boolean</code>                                  |
| **`enableViewportScale`**          | <code>boolean</code>                                  |
| **`allowInLineMediaPlayback`**     | <code>boolean</code>                                  |
| **`surpressIncrementalRendering`** | <code>boolean</code>                                  |
| **`viewStyle`**                    | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**              | <code><a href="#iosanimation">iOSAnimation</a></code> |


#### OpenInSystemBrowserParameterModel

Defines the options for opening a URL in the system browser.

| Prop          | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> |


#### SystemBrowserOptions

| Prop          | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`android`** | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> |
| **`iOS`**     | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         |


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

| Prop          | Type                 |
| ------------- | -------------------- |
| **`height`**  | <code>number</code>  |
| **`isFixed`** | <code>boolean</code> |


#### iOSSystemBrowserOptions

| Prop                       | Type                                                  |
| -------------------------- | ----------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  |
| **`enableReadersMode`**    | <code>boolean</code>                                  |


#### OpenInDefaultParameterModel

Defines the options for opening a URL in the external browser and used by the others.

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


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

| Members               |
| --------------------- |
| **`FADE_IN`**         |
| **`FADE_OUT`**        |
| **`SLIDE_IN_LEFT`**   |
| **`SLIDE_OUT_RIGHT`** |


#### DismissStyle

| Members      |
| ------------ |
| **`CLOSE`**  |
| **`CANCEL`** |
| **`DONE`**   |

</docgen-api>

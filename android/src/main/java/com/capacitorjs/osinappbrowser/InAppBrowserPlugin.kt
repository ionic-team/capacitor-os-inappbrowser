package com.capacitorjs.osinappbrowser
import androidx.lifecycle.lifecycleScope
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABClosable
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABEngine
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABRouter
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.helpers.OSIABFlowHelper
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABAnimation
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABBottomSheet
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABCustomTabsOptions
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABToolbarPosition
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABViewStyle
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABWebViewOptions
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABCustomTabsRouterAdapter
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABExternalBrowserRouterAdapter
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABWebViewRouterAdapter

@CapacitorPlugin(name = "InAppBrowser")
class InAppBrowserPlugin : Plugin() {

    private var engine: OSIABEngine? = null
    private var activeRouter: OSIABRouter<Boolean>? = null

    override fun load() {
        super.load()
        this.engine = OSIABEngine()
    }

    @PluginMethod
    fun openInExternalBrowser(call: PluginCall) {
        val url = call.getString("url")
        if (url.isNullOrEmpty()) {
            sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(OSInAppBrowserTarget.EXTERNAL_BROWSER))
            return
        }

        if (!isSchemeValid(url)) {
            sendErrorResult(call, OSInAppBrowserError.InvalidURL)
            return
        }

        try {
            val externalBrowserRouter = OSIABExternalBrowserRouterAdapter(context)

            engine?.openExternalBrowser(externalBrowserRouter, url) { success ->
                if (success) {
                    call.resolve()
                } else {
                    sendErrorResult(call, OSInAppBrowserError.OpenFailed(url, OSInAppBrowserTarget.EXTERNAL_BROWSER))
                }
            }
        } catch (e: Exception) {
            sendErrorResult(call, OSInAppBrowserError.GeneralError(url, OSInAppBrowserTarget.EXTERNAL_BROWSER, e))
        }
    }

    @PluginMethod
    fun openInSystemBrowser(call: PluginCall) {
        val url = call.getString("url")
        val options = call.getObject("options")

        if (url.isNullOrEmpty() || options == null) {
            sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(OSInAppBrowserTarget.SYSTEM_BROWSER))
            return
        }

        if (!isSchemeValid(url)) {
            sendErrorResult(call, OSInAppBrowserError.InvalidURL)
            return
        }

        try {
            // Try closing active router before continuing to open
            close {
                val customTabsOptions = buildCustomTabsOptions(options)

                val customTabsRouter = OSIABCustomTabsRouterAdapter(
                    context = context,
                    lifecycleScope = activity.lifecycleScope,
                    options = customTabsOptions,
                    flowHelper = OSIABFlowHelper(),
                    onBrowserPageLoaded = {
                        notifyListeners(OSIABEventType.BROWSER_PAGE_LOADED.value, null)
                    },
                    onBrowserFinished = {
                        notifyListeners(OSIABEventType.BROWSER_FINISHED.value, null)
                    }
                )

                engine?.openCustomTabs(customTabsRouter, url) { success ->
                    if (success) {
                        activeRouter = customTabsRouter
                        call.resolve()
                    } else {
                        sendErrorResult(call, OSInAppBrowserError.OpenFailed(url, OSInAppBrowserTarget.SYSTEM_BROWSER))
                    }
                }
            }
        } catch (e: Exception) {
            sendErrorResult(call, OSInAppBrowserError.GeneralError(url, OSInAppBrowserTarget.SYSTEM_BROWSER, e))
        }
    }

    @PluginMethod
    fun openInWebView(call: PluginCall) {
        val url = call.getString("url")
        val options = call.getObject("options")

        if (url.isNullOrEmpty() || options == null) {
            sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(OSInAppBrowserTarget.WEB_VIEW))
            return
        }

        if (!isSchemeValid(url)) {
            sendErrorResult(call, OSInAppBrowserError.InvalidURL)
            return
        }

        try {
            // Try closing active router before continuing to open
            close {
                val webViewOptions = buildWebViewOptions(options)

                val webViewRouter = OSIABWebViewRouterAdapter(
                    context = context,
                    lifecycleScope = activity.lifecycleScope,
                    options = webViewOptions,
                    flowHelper = OSIABFlowHelper(),
                    onBrowserPageLoaded = {
                        notifyListeners(OSIABEventType.BROWSER_PAGE_LOADED.value, null)
                    },
                    onBrowserFinished = {
                        notifyListeners(OSIABEventType.BROWSER_FINISHED.value, null)
                    }
                )

                engine?.openWebView(webViewRouter, url) { success ->
                    if (success) {
                        activeRouter = webViewRouter
                        call.resolve()
                    } else {
                        sendErrorResult(call, OSInAppBrowserError.OpenFailed(url, OSInAppBrowserTarget.WEB_VIEW))
                    }
                }
            }
        } catch (e: Exception) {
            sendErrorResult(call, OSInAppBrowserError.GeneralError(url, OSInAppBrowserTarget.WEB_VIEW, e))
        }

    }

    @PluginMethod
    fun close(call: PluginCall) {
        close { success ->
            if (success) {
                call.resolve()
            } else {
                sendErrorResult(call, OSInAppBrowserError.CloseFailed)
            }
        }
    }

    private fun close(callback: (Boolean) -> Unit) {
        (activeRouter as? OSIABClosable)?.let { closableRouter ->
            closableRouter.close { success ->
                if (success) {
                    activeRouter = null
                }
                callback(success)
            }
        } ?: callback(false)
    }

    /**
     * Parses options that come in a JSObject to create a 'OSIABWebViewOptions' object.
     * @param options The options to open the URL in a WebView.
     */
    private fun buildWebViewOptions(options: JSObject): OSIABWebViewOptions {
        return options.let {
            val showURL = it.getBoolean("showURL", true) ?: true
            val showToolbar = it.getBoolean("showToolbar", true) ?: true
            val clearCache = it.getBoolean("clearCache", true) ?: true
            val clearSessionCache = it.getBoolean("clearSessionCache", true) ?: true
            val mediaPlaybackRequiresUserAction = it.getBoolean("mediaPlaybackRequiresUserAction", false) ?: false
            val closeButtonText = it.getString("closeButtonText") ?: "Close"
            val toolbarPosition = it.getInteger("toolbarPosition")?.let { ordinal ->
                OSIABToolbarPosition.entries[ordinal]
            } ?: OSIABToolbarPosition.TOP
            val leftToRight = it.getBoolean("leftToRight", false) ?: false
            val showNavigationButtons = it.getBoolean("showNavigationButtons", false) ?: false
            val customWebViewAgent = it.getString("customWebViewUserAgent", null) ?: null
            val androidOptions = it.getJSObject("android")
            val allowZoom = androidOptions?.getBoolean("allowZoom", true) ?: true
            val hardwareBack = androidOptions?.getBoolean("hardwareBack", true) ?: true
            val pauseMedia = androidOptions?.getBoolean("pauseMedia", true) ?: true
            
            OSIABWebViewOptions(
                showURL,
                showToolbar,
                clearCache,
                clearSessionCache,
                mediaPlaybackRequiresUserAction,
                closeButtonText,
                toolbarPosition,
                leftToRight,
                showNavigationButtons,
                allowZoom,
                hardwareBack,
                pauseMedia,
                customWebViewAgent
            )
        }
    }

    /**
     * Parses options that come in a JSObject to create a 'OSIABCustomTabs' object.
     * @param options The options to open the URL in the system browser (Custom Tabs).
     */
    private fun buildCustomTabsOptions(options: JSObject): OSIABCustomTabsOptions {
        val optionsJson = options.getJSObject("android")

        return optionsJson.let {
            val showTitle = it?.getBoolean("showTitle", true) ?: true
            val hideToolbarOnScroll = it?.getBoolean("hideToolbarOnScroll", false) ?: false
            val viewStyle = it?.getInteger("viewStyle")?.let { ordinal ->
                OSIABViewStyle.entries[ordinal]
            } ?: OSIABViewStyle.FULL_SCREEN

            val bottomSheetOptions = it?.getJSObject("bottomSheetOptions")?.let { json ->
                val height = json.getInteger("height", 1) ?: 1
                val isFixed = json.getBoolean("isFixed", false) ?: false

                OSIABBottomSheet(height, isFixed)
            }

            val startAnimation = it?.getInteger("startAnimation")?.let { ordinal ->
                OSIABAnimation.entries[ordinal]
            } ?: OSIABAnimation.FADE_IN

            val exitAnimation = it?.getInteger("exitAnimation")?.let { ordinal ->
                OSIABAnimation.entries[ordinal]
            } ?: OSIABAnimation.FADE_OUT

            OSIABCustomTabsOptions(
                showTitle = showTitle,
                hideToolbarOnScroll = hideToolbarOnScroll,
                viewStyle = viewStyle,
                bottomSheetOptions = bottomSheetOptions,
                startAnimation = startAnimation,
                exitAnimation = exitAnimation
            )
        }
    }

    /**
     * Determines if URL scheme is valid - it must start with either 'http://' or 'https://'
     * @param url string with URL to validate
     */
    private fun isSchemeValid(url: String): Boolean {
        return listOf("http://", "https://").any { url.startsWith(it, true) }
    }

    /**
     * Helper method to send an error result using call.reject
     * @param call The PluginCall object to send the error result
     * @param error The OSInAppBrowserError object to send as the error result
     */
    private fun sendErrorResult(call: PluginCall, error: OSInAppBrowserError) {
        call.reject(error.message, error.code)
    }


}

enum class OSIABEventType(val value: String) {
    BROWSER_FINISHED("browserClosed"),
    BROWSER_PAGE_LOADED("browserPageLoaded")
}

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
        handleBrowserCall(call, OSInAppBrowserTarget.EXTERNAL_BROWSER) { url ->
            val externalBrowserRouter = OSIABExternalBrowserRouterAdapter(context)
            engine?.openExternalBrowser(externalBrowserRouter, url) { success ->
                handleBrowserResult(call, success, url, OSInAppBrowserTarget.EXTERNAL_BROWSER)
            }
        }
    }

    @PluginMethod
    fun openInSystemBrowser(call: PluginCall) {
        handleBrowserCall(call, OSInAppBrowserTarget.SYSTEM_BROWSER) { url ->
            val options = call.getObject("options")
                ?: return@handleBrowserCall sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(OSInAppBrowserTarget.SYSTEM_BROWSER))
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
                    },
                    onBrowserPageNavigationCompleted = {}
                )
                engine?.openCustomTabs(customTabsRouter, url) { success ->
                    if (success) activeRouter = customTabsRouter
                    handleBrowserResult(call, success, url, OSInAppBrowserTarget.SYSTEM_BROWSER)
                }
            }
        }
    }

    @PluginMethod
    fun openInWebView(call: PluginCall) {
        handleBrowserCall(call, OSInAppBrowserTarget.WEB_VIEW) { url ->
            val options = call.getObject("options")
                ?: return@handleBrowserCall sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(OSInAppBrowserTarget.WEB_VIEW))
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
                    },
                    onBrowserPageNavigationCompleted = {
                        notifyListeners(
                            OSIABEventType.BROWSER_PAGE_NAVIGATION_COMPLETED.value,
                            JSObject().put("url", it)
                        )
                    }
                )
                engine?.openWebView(webViewRouter, url) { success ->
                    if (success) activeRouter = webViewRouter
                    handleBrowserResult(call, success, url, OSInAppBrowserTarget.WEB_VIEW)
                }
            }
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

    private fun handleBrowserCall(call: PluginCall, target: OSInAppBrowserTarget, action: (String) -> Unit) {
        val url = call.getString("url")
        if (url.isNullOrEmpty()) {
            sendErrorResult(call, OSInAppBrowserError.InputArgumentsIssue(target))
            return
        }
        if (!isSchemeValid(url)) {
            sendErrorResult(call, OSInAppBrowserError.InvalidURL)
            return
        }
        try {
            action(url)
        } catch (e: Exception) {
            sendErrorResult(call, OSInAppBrowserError.OpenFailed(url, target))
        }
    }

    private fun handleBrowserResult(call: PluginCall, success: Boolean, url: String, target: OSInAppBrowserTarget) {
        if (success) {
            call.resolve()
        } else {
            sendErrorResult(call, OSInAppBrowserError.OpenFailed(url, target))
        }
    }

    /**
     * Parses options that come in a JSObject to create a 'OSIABWebViewOptions' object.
     * @param options The options to open the URL in a WebView.
     */
    private fun buildWebViewOptions(options: JSObject): OSIABWebViewOptions {
        return options.let {
            val androidOptions = it.getJSObject("android")
            OSIABWebViewOptions(
                showURL = it.getBoolean("showURL", true) ?: true,
                showToolbar = it.getBoolean("showToolbar", true) ?: true,
                clearCache = it.getBoolean("clearCache", true) ?: true,
                clearSessionCache = it.getBoolean("clearSessionCache", true) ?: true,
                mediaPlaybackRequiresUserAction = it.getBoolean("mediaPlaybackRequiresUserAction", false) ?: false,
                closeButtonText = it.getString("closeButtonText") ?: "Close",
                toolbarPosition = it.getInteger("toolbarPosition")?.let { ordinal ->
                    OSIABToolbarPosition.entries[ordinal]
                } ?: OSIABToolbarPosition.TOP,
                leftToRight = it.getBoolean("leftToRight", false) ?: false,
                showNavigationButtons = it.getBoolean("showNavigationButtons", false) ?: false,
                allowZoom = androidOptions?.getBoolean("allowZoom", true) ?: true,
                hardwareBack = androidOptions?.getBoolean("hardwareBack", true) ?: true,
                pauseMedia = androidOptions?.getBoolean("pauseMedia", true) ?: true,
                customUserAgent = it.getString("customWebViewUserAgent", null)
            )
        }
    }

    /**
     * Parses options that come in a JSObject to create a 'OSIABCustomTabs' object.
     * @param options The options to open the URL in the system browser (Custom Tabs).
     */
    private fun buildCustomTabsOptions(options: JSObject): OSIABCustomTabsOptions {
        val optionsJson = options.getJSObject("android")
        return OSIABCustomTabsOptions(
            showTitle = optionsJson?.getBoolean("showTitle", true) ?: true,
            hideToolbarOnScroll = optionsJson?.getBoolean("hideToolbarOnScroll", false) ?: false,
            viewStyle = optionsJson?.getInteger("viewStyle")?.let { OSIABViewStyle.entries[it] }
                ?: OSIABViewStyle.FULL_SCREEN,
            bottomSheetOptions = optionsJson?.getJSObject("bottomSheetOptions")?.let {
                OSIABBottomSheet(
                    height = it.getInteger("height", 1) ?: 1,
                    isFixed = it.getBoolean("isFixed", false) ?: false
                )
            },
            startAnimation = optionsJson?.getInteger("startAnimation")?.let { OSIABAnimation.entries[it] }
                ?: OSIABAnimation.FADE_IN,
            exitAnimation = optionsJson?.getInteger("exitAnimation")?.let { OSIABAnimation.entries[it] } ?: OSIABAnimation.FADE_OUT
        )
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
    BROWSER_PAGE_LOADED("browserPageLoaded"),
    BROWSER_PAGE_NAVIGATION_COMPLETED("browserPageNavigationCompleted")
}

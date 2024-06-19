package com.capacitorjs.osinappbrowser
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABEngine
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABToolbarPosition
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABWebViewOptions
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABExternalBrowserRouterAdapter
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABWebViewRouterAdapter

@CapacitorPlugin(name = "InAppBrowser")
class InAppBrowserPlugin : Plugin() {

    private var engine: OSIABEngine? = null

    override fun load() {
        super.load()
        val externalBrowserRouter = OSIABExternalBrowserRouterAdapter(context)
        val webViewRouter = OSIABWebViewRouterAdapter(context)
        this.engine = OSIABEngine(externalBrowserRouter, webViewRouter)
    }

    @PluginMethod
    fun openInExternalBrowser(call: PluginCall) {
        val url = call.getString("url")
        if (url == null) {
            call.reject("The input parameters for 'openInExternalBrowser' are invalid.")
            return
        }

        engine?.openExternalBrowser(url) { success ->
            if (success) {
                call.resolve()
            } else {
                call.reject("Couldn't open '$url' using the external browser.")
            }
        }
    }

    @PluginMethod
    fun openInWebView(call: PluginCall) {
        try {
            val url = call.getString("url")
            val options = buildWebViewOptions(call.getObject("options"))

            engine?.openWebView(url!!, options) { success ->
                if (success) {
                    call.resolve()
                } else {
                    call.reject("Couldn't open '$url' using the web view.")
                }
            }
        } catch (e: Exception) {
            call.reject("The input parameters for 'openInWebView' are invalid.")
        }

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
                pauseMedia
            )
        }
    }

}

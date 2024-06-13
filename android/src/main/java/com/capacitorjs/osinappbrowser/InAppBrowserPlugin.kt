package com.capacitorjs.osinappbrowser
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABEngine
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABAnimation
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABBottomSheet
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABCustomTabsOptions
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.models.OSIABViewStyle
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABCustomTabsRouterAdapter
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.routeradapters.OSIABExternalBrowserRouterAdapter

@CapacitorPlugin(name = "InAppBrowser")
class InAppBrowserPlugin : Plugin() {

    private var engine: OSIABEngine? = null

    override fun load() {
        super.load()
        val externalBrowserRouter = OSIABExternalBrowserRouterAdapter(context)
        val customTabsRouter = OSIABCustomTabsRouterAdapter(context)
        engine = OSIABEngine(externalBrowserRouter, customTabsRouter)
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
    fun openInSystemBrowser(call: PluginCall) {
        val url = call.getString("url")
        if (url == null) {
            call.reject("The input parameters for 'openInExternalBrowser' are invalid.")
            return
        }

        val optionsJson = call.getObject("options")?.getJSObject("android")

        val options = optionsJson?.let {
            val showTitle = it.getBoolean("showTitle", true) ?: true
            val hideToolbarOnScroll = it.getBoolean("hideToolbarOnScroll", false) ?: false
            val viewStyle = it.getInteger("viewStyle")?.let { ordinal ->
                OSIABViewStyle.entries[ordinal]
            } ?: OSIABViewStyle.FULL_SCREEN

            val bottomSheetOptions = it.getJSObject("bottomSheetOptions")?.let { json ->
                val height = json.getInteger("height", 1) ?: 1
                val isFixed = json.getBoolean("isFixed", false) ?: false

                OSIABBottomSheet(height, isFixed)
            }

            val startAnimation = it.getInteger("startAnimation")?.let { ordinal ->
                OSIABAnimation.entries[ordinal]
            } ?: OSIABAnimation.FADE_IN

            val exitAnimation = it.getInteger("exitAnimation")?.let { ordinal ->
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

        engine?.openCustomTabs(url, options) { success ->
            if (success) {
                call.resolve()
            } else {
                call.reject("Couldn't open '$url' using the external browser.")
            }
        }
    }
}

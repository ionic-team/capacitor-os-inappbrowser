package com.capacitorjs.osinappbrowser
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABEngine

@CapacitorPlugin(name = "InAppBrowser")
class InAppBrowserPlugin : Plugin() {

    private var engine: OSIABEngine? = null

    override fun load() {
        super.load()
        val router = OSBrowserRouterAdapter(context)
        engine = OSIABEngine(router)
    }

    @PluginMethod
    fun openInExternalBrowser(call: PluginCall) {
        val url = call.getString("url")
        if (url == null) {
            call.reject("The input parameters for 'openInExternalBrowser' are invalid.")
            return
        }

        val success = engine?.openExternalBrowser(url) ?: false
        if (success) {
            call.resolve()
        } else {
            call.reject("Couldn't open '$url' using the external browser.")
        }
    }
}

package com.capacitorjs.osinappbrowser

import android.content.Context
import android.content.Intent
import android.net.Uri
import com.outsystems.plugins.inappbrowser.osinappbrowserlib.OSIABRouter

class OSBrowserRouterAdapter(private val context: Context) : OSIABRouter {
    override fun openInBrowser(url: String): Boolean {
        return try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            context.startActivity(intent)
            true
        } catch (e: Exception) {
            false
        }
    }
}
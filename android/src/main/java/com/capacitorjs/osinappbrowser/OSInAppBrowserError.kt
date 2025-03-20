package com.capacitorjs.osinappbrowser

sealed class OSInAppBrowserError(val code: String, val message: String) {
    data class InputArgumentsIssue(val target: OSInAppBrowserTarget) : OSInAppBrowserError(
        code = target.inputIssueCode.formatErrorCode(),
        message = "The '${target.inputIssueText}' input parameters aren't valid."
    )

    data class OpenFailed(val url: String, val target: OSInAppBrowserTarget) : OSInAppBrowserError(
        code = target.openFailedCode.formatErrorCode(),
        message = "${target.openFailedText} couldn't open the following URL: $url"
    )

    data object CloseFailed : OSInAppBrowserError(
        code = 12.formatErrorCode(),
        message = "There's no browser view to close."
    )

    data object InvalidURL : OSInAppBrowserError(
        code = 3.formatErrorCode(),
        message = "The URL provided must begin with either http:// or https://."
    )
}

enum class OSInAppBrowserTarget(
    val inputIssueCode: Int,
    val inputIssueText: String,
    val openFailedCode: Int,
    val openFailedText: String,
) {
    EXTERNAL_BROWSER(5, "openInExternalBrowser", 8, "External browser"),
    SYSTEM_BROWSER(6, "openInSystemBrowser", 10, "Custom Tabs"),
    WEB_VIEW(7, "openInWebView", 11, "The WebView")
}

private fun Int.formatErrorCode(): String {
    return "OS-PLUG-IABP-" + this.toString().padStart(4, '0')
}
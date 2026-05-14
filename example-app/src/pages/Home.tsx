import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter, IonItem, IonLabel, IonToggle } from '@ionic/react';
import { InAppBrowser, DefaultSystemBrowserOptions, DefaultWebViewOptions, DefaultAndroidWebViewOptions, DismissStyle, iOSViewStyle, iOSAnimation, ToolbarPosition, AndroidViewStyle, AndroidAnimation, BrowserPageNavigationCompletedEventData } from '@capacitor/inappbrowser';
import './Home.css';

const Home: React.FC = () => {

  const [testUrl, setTestUrl] = useState("https://mdn.github.io/dom-examples/web-storage/");
  const [showIframe, setShowIframe] = useState(false);
  const [isIsolated, setIsIsolated] = useState(true);

  const openInExternalBrowser = () => {
    InAppBrowser.openInExternalBrowser({
      url: "https://www.google.com"
    });
  }

  const invalidScheme = async () => {
    try {
      const result = await InAppBrowser.openInExternalBrowser({
        url: "mailto://mail@outsystems.com"
      });
    } catch (error) {
      if (error instanceof Error) {
        alert("Error: " + (error as any).code + ": " + error.message);
      } else {
        alert("Error: Unknown error");
      }
    }

  }

  const openInSystemBrowserWithDefaults = () => {
    InAppBrowser.openInSystemBrowser({
      url: "https://www.google.com",
      options: DefaultSystemBrowserOptions
    });
  }

  const openInSystemBrowserWithCustomValues = () => {
    InAppBrowser.openInSystemBrowser({
      url: "https://www.asymco.com/",
      options: {
        android: {
          showTitle: true,
          hideToolbarOnScroll: true,
          viewStyle: AndroidViewStyle.BOTTOM_SHEET,
          startAnimation: AndroidAnimation.FADE_OUT,
          exitAnimation: AndroidAnimation.FADE_IN,
          bottomSheetOptions: {
            height: 200,
            isFixed: false
          }
        },
        iOS: {
          closeButtonText: DismissStyle.CANCEL,
          viewStyle: iOSViewStyle.FORM_SHEET,
          animationEffect: iOSAnimation.FLIP_HORIZONTAL,
          enableBarsCollapsing: false,
          enableReadersMode: true
        }
      }
    });
  }

  const openInWebViewWithDefaults = () => {
    InAppBrowser.openInWebView({
      url: "https://www.google.com",
      options: DefaultWebViewOptions
    });
  }

  const openInWebViewWithCustomValues = () => {
    InAppBrowser.openInWebView({
      url: "https://www.outsystems.com/",
      options: {
        showURL: false,
        showToolbar: true,
        clearCache: false,
        clearSessionCache: false,
        mediaPlaybackRequiresUserAction: true,
        closeButtonText: "Done",
        toolbarPosition: ToolbarPosition.BOTTOM,
        showNavigationButtons: false,
        leftToRight: true,
        android: DefaultAndroidWebViewOptions,
        customWebViewUserAgent: `${window.navigator.userAgent} SepcialUser`,
        iOS: {
          allowOverScroll: false,
          enableViewportScale: true,
          allowInLineMediaPlayback: true,
          surpressIncrementalRendering: true,
          viewStyle: iOSViewStyle.PAGE_SHEET,
          animationEffect: iOSAnimation.CROSS_DISSOLVE,
          allowsBackForwardNavigationGestures: true
        }
      },
      customHeaders: {
        "X-Custom-Header": "CustomValue",
        "X-Another-Header": "AnotherValue"
      }
    });
  }

  const openInWebViewWithMoreCustomValues = () => {
    InAppBrowser.openInWebView({
      url: "https://www.outsystems.com/",
      options: {
        showURL: true,
        showToolbar: true,
        clearCache: true,
        clearSessionCache: true,
        mediaPlaybackRequiresUserAction: false,
        closeButtonText: "Done",
        toolbarPosition: ToolbarPosition.TOP,
        showNavigationButtons: true,
        leftToRight: false,
        android: {
          allowZoom: true,
          hardwareBack: true,
          pauseMedia: true
        },
        iOS: {
          allowOverScroll: false,
          enableViewportScale: true,
          allowInLineMediaPlayback: true,
          surpressIncrementalRendering: true,
          viewStyle: iOSViewStyle.PAGE_SHEET,
          animationEffect: iOSAnimation.CROSS_DISSOLVE,
          allowsBackForwardNavigationGestures: true
        }
      }
    });
  }

  const openInSystemBrowserThenClose = async () => {
    await InAppBrowser.openInSystemBrowser({
      url: "https://www.google.com",
      options: DefaultSystemBrowserOptions
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    InAppBrowser.close();
  }

  const openInWebViewThenClose = async () => {
    await InAppBrowser.openInWebView({
      url: "https://www.google.com",
      options: DefaultWebViewOptions
    });

    await InAppBrowser.close();
  }

  const close = () => {
    InAppBrowser.close();
  }

  const router = useIonRouter();

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  const openLocalStorageTestInWebView = () => {
    // We open the local storage test page in the InAppBrowser
    // NOTE: On Android with Process Isolation, 'http://localhost' may 404
    // because the new process doesn't have the Capacitor local server.
    // For a true same-origin test, use a remote URL.
    InAppBrowser.openInWebView({
      url: testUrl,
      options: {
        ...DefaultWebViewOptions,
        showURL: true,
        showToolbar: true,
        clearCache: false,
        android: {
          ...DefaultAndroidWebViewOptions,
          isIsolated: isIsolated
        }
      }
    });
  }

  InAppBrowser.addListener('browserClosed', () => {
    console.log("browser was closed.");
  });

  InAppBrowser.addListener('browserPageLoaded', () => {
    console.log("browser was loaded.");
  });

  InAppBrowser.addListener('browserPageNavigationCompleted', (data: BrowserPageNavigationCompletedEventData) => {
    console.log("browser page navigation was completed. " + data.url);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonButton onClick={openInExternalBrowser}>External Browser</IonButton>
          <IonButton onClick={openInSystemBrowserWithDefaults}>System Browser with Defaults</IonButton>
          <IonButton onClick={openInSystemBrowserWithCustomValues}>System Browser with Custom Values</IonButton>
          <IonButton onClick={openInWebViewWithDefaults}>Web View with Defaults</IonButton>
          <IonButton onClick={openInWebViewWithCustomValues}>Web View with Custom Values</IonButton>
          <IonButton onClick={openInWebViewWithMoreCustomValues}>Web View with More Custom Values</IonButton>
          <IonButton onClick={openInSystemBrowserThenClose}>Open System Browser then Close</IonButton>
          <IonButton onClick={openInWebViewThenClose}>Open Web View then Close</IonButton>
          <IonButton onClick={invalidScheme}>Invalid URL Scheme</IonButton>

          <div style={{ padding: '10px', margin: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Isolation Test</h3>
            <IonItem>
              <IonLabel position="stacked">Test URL</IonLabel>
              <IonInput value={testUrl} onIonChange={e => setTestUrl(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel>Enable Storage Isolation (Android)</IonLabel>
              <IonToggle checked={isIsolated} onIonChange={e => setIsIsolated(e.detail.checked)} />
            </IonItem>
            <p style={{ fontSize: '0.8em', color: '#666' }}>
              <strong>To replicate shared storage on API &lt; 28:</strong><br />
              1. Show the "Site Setter" below.<br />
              2. Use the embedded page to set a value.<br />
              3. Tap "2. Open Site (InAppBrowser)". It should share the value.<br />
              <br />
              <strong>On API 28+ (Isolated):</strong><br />
              The value will NOT be shared.
            </p>
            <IonButton expand="block" color="secondary" onClick={toggleIframe}>
              {showIframe ? "Hide Site Setter" : "1. Show Site Setter (Main App)"}
            </IonButton>

            {showIframe && (
              <div style={{ margin: '10px 0', border: '2px solid #3880ff', borderRadius: '4px', overflow: 'hidden' }}>
                <p style={{ padding: '5px', margin: 0, backgroundColor: '#3880ff', color: 'white', fontSize: '0.8em', textAlign: 'center' }}>
                  Main App Context (Iframe)
                </p>
                <iframe
                  src={testUrl}
                  style={{ width: '100%', height: '300px', border: 'none' }}
                  title="Storage Setter"
                />
              </div>
            )}

            <IonButton expand="block" color="tertiary" onClick={openLocalStorageTestInWebView}>2. Open Site (InAppBrowser)</IonButton>
            <IonButton expand="block" fill="outline" onClick={() => router.push('/local-storage-test')}>Go to Local Test Component</IonButton>
          </div>

          <IonInput placeholder="Enter text here..." />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

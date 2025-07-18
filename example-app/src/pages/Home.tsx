import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser, DefaultSystemBrowserOptions, DefaultWebViewOptions, DefaultAndroidWebViewOptions, DismissStyle, iOSViewStyle, iOSAnimation, ToolbarPosition, AndroidViewStyle, AndroidAnimation, BrowserPageNavigationCompletedEventData } from '@capacitor/inappbrowser';
import './Home.css';

const Home: React.FC = () => {

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
          <IonButton onClick={close}>Close opened Browser</IonButton>
          <IonButton onClick={invalidScheme}>Invalid URL Scheme</IonButton>
          <IonInput placeholder="Enter text here..." />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

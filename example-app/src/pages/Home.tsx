import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser, SystemBrowserOptions, DefaultSystemBrowserOptions, DefaultAndroidSystemBrowserOptions, WebViewOptions, DefaultWebViewOptions, DefaultAndroidWebViewOptions, DismissStyle, iOSViewStyle, iOSAnimation, ToolbarPosition } from '@capacitor/os-inappbrowser';
import './Home.css';

const Home: React.FC = () => {

  const test = () => {
    InAppBrowser.openInExternalBrowser({
      url: "https://www.google.com"
    });
  }

  const invalidScheme = () => {
    InAppBrowser.openInExternalBrowser({
      url: "mailto://mail@outsystems.com"
    });
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
        android: DefaultAndroidSystemBrowserOptions,
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
        iOS: {
          allowOverScroll: false,
          enableViewportScale: true,
          allowInLineMediaPlayback: true,
          surpressIncrementalRendering: true,
          viewStyle: iOSViewStyle.PAGE_SHEET,
          animationEffect: iOSAnimation.CROSS_DISSOLVE
        }
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
          animationEffect: iOSAnimation.CROSS_DISSOLVE
        }
      }
    });
  }

  const close = () => {
    InAppBrowser.openInWebView({
      url: "https://www.google.com",
      options: DefaultWebViewOptions
    }).then(() => {
      InAppBrowser.close();
    }); 
  }

  InAppBrowser.addListener('browserClosed', () => {
    console.log("browser was closed.");
  });

  InAppBrowser.addListener('browserPageLoaded', () => {
    console.log("browser was loaded.");
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
          <IonButton onClick={test}>TEST</IonButton>
          <IonButton onClick={openInSystemBrowserWithDefaults}>System Browser with Defaults</IonButton>
          <IonButton onClick={openInSystemBrowserWithCustomValues}>System Browser with Custom Values</IonButton>
          <IonButton onClick={openInWebViewWithDefaults}>Web View with Defaults</IonButton>
          <IonButton onClick={openInWebViewWithCustomValues}>Web View with Custom Values</IonButton>
          <IonButton onClick={openInWebViewWithMoreCustomValues}>Web View with More Custom Values</IonButton>
          <IonButton onClick={close}>Close opened Browser</IonButton>
          <IonButton onClick={invalidScheme}>Invalid URL Scheme</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

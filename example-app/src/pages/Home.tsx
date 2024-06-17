import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser, WebViewOptions, DismissStyle, iOSViewStyle, iOSAnimation, ToolbarPosition } from '@capacitor/os-inappbrowser';
import './Home.css';

const Home: React.FC = () => {

  const test = () => {
    InAppBrowser.openInExternalBrowser({
      url: "https://www.google.com"
    });
  }

  const openInWebViewWithCustomValues = () => {
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
          <IonButton onClick={openInWebViewWithCustomValues}>Web View with Custom Values</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

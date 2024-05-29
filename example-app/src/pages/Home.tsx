import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser, SystemBrowserOptions, DefaultSystemBrowserOptions, DefaultAndroidSystemBrowserOptions, DismissStyle, iOSViewStyle, iOSAnimation } from '@capacitor/os-inappbrowser';
import './Home.css';

const Home: React.FC = () => {

  const test = () => {
    InAppBrowser.openInExternalBrowser({
      url: "https://www.google.com"
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

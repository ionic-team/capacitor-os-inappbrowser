import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser, DefaultSystemBrowserOptions, DefaultWebViewOptions, DefaultAndroidWebViewOptions, DismissStyle, iOSViewStyle, iOSAnimation, ToolbarPosition, AndroidViewStyle, AndroidAnimation, BrowserPageNavigationCompletedEventData } from '@capacitor/inappbrowser';

const BrowserPiPTest: React.FC = () => {
  const [log, setLog] = useState("");
  const [closeCount, setCloseCount] = useState(0);

  useEffect(() => {
    const handle = InAppBrowser.addListener('browserClosed', () => {
      setCloseCount(prev => {
        const next = prev + 1;
        setLog(l => l + `[${new Date().toISOString().slice(11, 19)}] browserClosed\n`);
        return next;
      });
    });
    return () => {
      handle.then(h => h.remove());
    };
  }, []);

  const openBrowser = () => {
    InAppBrowser.openInSystemBrowser({
         url: "https://www.asymco.com/",
         options: DefaultSystemBrowserOptions
       });
  };

  const reset = () => {
    setLog("");
    setCloseCount(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>PiP / browserClosed Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonButton expand="block" onClick={openBrowser}>Open Browser</IonButton>
        <IonButton expand="block" fill="outline" onClick={reset}>Reset log</IonButton>
        <pre style={{ background: 'transparent', border: '1px solid #ccc', padding: '8px', maxHeight: '300px', overflow: 'auto', fontSize: '0.75em', whiteSpace: 'pre-wrap' }}>{log || '(no events yet)'}</pre>
      </IonContent>
    </IonPage>
  );
};

export default BrowserPiPTest;

import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { InAppBrowser } from '@capacitor/os-inappbrowser';
import './Home.css';

const Home: React.FC = () => {

  const test = () => {
    // InAppBrowser.openInExternalBrowser('https://www.google.com');
    console.log('test')
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

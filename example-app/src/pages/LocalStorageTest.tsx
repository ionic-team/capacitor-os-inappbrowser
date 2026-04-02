import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonList, IonButtons, IonBackButton } from '@ionic/react';

const LocalStorageTest: React.FC = () => {
  const [value, setValue] = useState('');
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const refreshValue = () => {
    const val = localStorage.getItem('inappbrowser_test_key');
    setStoredValue(val);
  };

  useEffect(() => {
    refreshValue();
  }, []);

  const saveValue = () => {
    localStorage.setItem('inappbrowser_test_key', value);
    refreshValue();
  };

  const clearValue = () => {
    localStorage.removeItem('inappbrowser_test_key');
    refreshValue();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>LocalStorage Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Test Value</IonLabel>
            <IonInput value={value} onIonChange={(e: any) => setValue(e.detail.value!)} placeholder="Enter value to store" />
          </IonItem>
        </IonList>
        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" onClick={saveValue}>Save to LocalStorage</IonButton>
          <IonButton expand="block" color="light" onClick={refreshValue}>Refresh from LocalStorage</IonButton>
          <IonButton expand="block" color="danger" onClick={clearValue}>Clear LocalStorage</IonButton>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Stored Value:</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{storedValue || '(none)'}</p>
        </div>

        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <p><strong>Instructions:</strong></p>
          <ol>
            <li>Set a value here in the main app.</li>
            <li>Go back and open this same page using "Open Site (InAppBrowser)".</li>
            <li>Use the <strong>Enable Storage Isolation</strong> toggle to test different modes.
              <ul>
                <li><strong>On (Default)</strong>: Value should be "(none)".</li>
                <li><strong>Off</strong>: Value should be shared.</li>
              </ul>
            </li>
          </ol>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocalStorageTest;

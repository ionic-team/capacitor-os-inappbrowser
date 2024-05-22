import { InAppBrowser } from '@capacitor&#x2F;os-inappbrowser';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    InAppBrowser.echo({ value: inputValue })
}

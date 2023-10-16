import { useEffect, useState } from "react";
import axios from "./config/axios";
import { GOOGLE_OAUTH_CLIENT_ID } from "./config/env";

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleGoogleAuthResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // submit jwt to server
    axios.post('/auth/login', {
      token: response.credential
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    if (!loaded) return;
    // Script tag is loaded!
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      callback: handleGoogleAuthResponse,
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }, [loaded]);

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(scriptTag);
  }, []);

  function getHealth() {
    console.log('pressed')
    axios.get('http://localhost:3000/health').then(res => {
      console.log(res);
    })
  }

  return (
    <>
      <div id="googleSignInButton" ></div>
      <button onClick={getHealth}>Get backend Health</button>
    </>
  );
}

export default App;

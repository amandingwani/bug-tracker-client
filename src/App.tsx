import { useEffect, useState } from 'react';
import axios from './config/axios';
import { GOOGLE_OAUTH_CLIENT_ID } from './config/env';

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleGoogleAuthResponse = async (response: any) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    try {
      const { data } = await axios.post('/auth/login', {
        token: response.credential,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }, [loaded]);

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(scriptTag);
  }, []);

  async function getHealth() {
    console.log('pressed');
    try {
      const res = await axios.get('http://localhost:3000/health');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div id="googleSignInButton"></div>
      <button onClick={getHealth}>Get backend Health</button>
    </>
  );
}

export default App;

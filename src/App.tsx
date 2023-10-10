import { useEffect, useState } from "react";
// import "./App.css";

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleGoogleAuthResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
    if (!loaded) return;
    // Script tag is loaded!
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
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

  return (
    <>
      <div id="googleSignInButton" ></div>
    </>
  );
}

export default App;

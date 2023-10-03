import { useEffect } from "react";
// import "./App.css";

function App() {
  const handleGoogleAuthResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div id="googleSignInButton" ></div>
    </>
  );
}

export default App;

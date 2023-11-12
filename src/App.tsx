import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );

  // const [loaded, setLoaded] = useState(false);

  // const handleGoogleAuthResponse = async (response: any) => {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   try {
  //     const { data } = await axios.post('/auth/login', {
  //       token: response.credential,
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!loaded) return;
  //   // Script tag is loaded!
  //   // @ts-ignore
  //   google.accounts.id.initialize({
  //     client_id: GOOGLE_OAUTH_CLIENT_ID,
  //     callback: handleGoogleAuthResponse,
  //   });

  //   // @ts-ignore
  //   google.accounts.id.renderButton(
  //     document.getElementById('googleSignInButton'),
  //     { theme: 'outline', size: 'large' } // customization attributes
  //   );
  // }, [loaded]);

  // useEffect(() => {
  //   const scriptTag = document.createElement('script');
  //   scriptTag.src = 'https://accounts.google.com/gsi/client';
  //   scriptTag.addEventListener('load', () => setLoaded(true));
  //   document.body.appendChild(scriptTag);
  // }, []);

  // async function getHealth() {
  //   console.log('pressed');
  //   try {
  //     const res = await axios.get('http://localhost:3000/health');
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // return (
  //   <>
  //     <div id="googleSignInButton"></div>
  //     <Button variant="contained" onClick={getHealth}>
  //       Get backend Health
  //     </Button>
  //     {/* <ThemeProvider></ThemeProvider> */}
  //   </>
  // );
}

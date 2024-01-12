import { Helmet } from 'react-helmet-async';
import SnackbarNotification from 'src/components/snackbarNotification/snackbarNotification';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Bug-Ninja </title>
      </Helmet>

      <SnackbarNotification />
      <LoginView />
    </>
  );
}

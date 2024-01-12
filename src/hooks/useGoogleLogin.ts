import { useGoogleLogin as uGL } from '@react-oauth/google';

import { useAppDispatch } from 'src/redux/hooks'
import { googleLogin } from 'src/redux/slices/authSlice';
import { showNotification, updateNotification } from 'src/redux/slices/notificationSlice';

// ----------------------------------------------------------------------

export default function useGoogleLogin() {
  const dispatch = useAppDispatch();

  const googleLoginHandler = uGL({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      dispatch(googleLogin(codeResponse.code))
    },
    onError: (err) => {
      console.log(err)
      dispatch(updateNotification({ severity: 'error', message: err.error ?? 'Google server error' }))
      dispatch(showNotification())
    },
    // ux_mode: 'redirect',
    // redirect_uri: 'http://localhost:5173/login',
  });

  return googleLoginHandler;
}

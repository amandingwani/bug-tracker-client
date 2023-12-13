import { useGoogleLogin as uGL } from '@react-oauth/google';

import { useAppDispatch } from 'src/redux/hooks'
import { googleLogin } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

export default function useGoogleLogin() {
  const dispatch = useAppDispatch();

  const googleLoginHandler = uGL({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      dispatch(googleLogin(codeResponse.code))
    },
    onError: (err) => console.log(err),
    // ux_mode: 'redirect',
    // redirect_uri: 'http://localhost:5173/login',
  });

  return googleLoginHandler;
}

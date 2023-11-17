import { useEffect } from 'react';

import { useAppDispatch } from 'src/redux/hooks'
import { setUser } from 'src/redux/slices/userSlice';
import getProfile from 'src/services/profile';

// ----------------------------------------------------------------------

export function useAutoLogin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProfile()
      .then((userData) => {
        console.log({ profile: userData });
        dispatch(setUser({
          id: userData.id,
          google_id_sub: userData.google_id_sub,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          picture: userData.picture
        }))
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

import { useEffect } from 'react';

import { useAppDispatch } from 'src/redux/hooks'
import { autoLogin } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

export function useAutoLogin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

import { useEffect } from 'react';

import { useAppDispatch } from 'src/redux/hooks'
import { autoLogin, setUser } from 'src/redux/slices/authSlice';
import { loadProjects } from 'src/redux/slices/projectsSlice';
import { UserState } from 'src/redux/types';

// ----------------------------------------------------------------------

export function useAutoLogin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageUserString = localStorage.getItem('BUG_NINJA_USER')
    const localStorageUser: UserState | null = localStorageUserString ? JSON.parse(localStorageUserString) : null;
    if (localStorageUser) {
      dispatch(setUser(localStorageUser));
      dispatch(loadProjects());
    }
    else
      dispatch(autoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

import { useEffect } from 'react';
import getProfile from 'src/services/profile';

// ----------------------------------------------------------------------

export function useAutoLogin() {

    useEffect(() => {
        getProfile().then(data => console.log(data))
            .catch(err => console.log(err));
    }, []);

    return null;
}

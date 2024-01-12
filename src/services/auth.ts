import { HttpStatusCode } from 'axios';

import axios from 'src/config/axios';
import { UserState } from 'src/redux/types';

type loginWithGoogleReturnType = {
  user: UserState,
  status: HttpStatusCode
}

export const loginWithGoogle = (code: string) => {
  return new Promise<loginWithGoogleReturnType>((resolve, reject) => {
    axios
      .post('/auth/google', {
        code: code,
      })
      .then((res) => {
        resolve({
          user: res.data,
          status: res.status
        })
      })
      .catch((err) => reject(err));
  });
};

// export const clearToken = () => {
//   return new Promise((resolve, reject) => {
//     axios.post('/auth/logout')
//       .then((res) => resolve(res.data))
//       .catch((err) => reject(err));
//   })
// }

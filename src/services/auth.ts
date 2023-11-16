import axios from 'src/config/axios';
import { UserState } from 'src/redux/types';

export const loginWithGoogle = (code: string) => {
  return new Promise<UserState>((resolve, reject) => {
    axios
      .post('/auth/google', {
        code: code,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const clearToken = () => {
  return new Promise((resolve, reject) => {
    axios.post('/auth/logout')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  })
}

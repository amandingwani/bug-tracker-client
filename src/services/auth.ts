import axios from 'src/config/axios';
import { UserState } from 'src/redux/types';

const loginWithGoogle = (code: string) => {
  return new Promise<UserState>((resolve, reject) => {
    axios
      .post('/auth/google', {
        code: code,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const authService = { loginWithGoogle };

export default authService;

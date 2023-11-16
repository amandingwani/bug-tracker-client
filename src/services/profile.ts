import axios from 'src/config/axios';
import { UserState } from 'src/redux/types';

const getProfile = () => {
  return new Promise<UserState>((resolve, reject) => {
    axios
      .get('/user/profile')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export default getProfile;

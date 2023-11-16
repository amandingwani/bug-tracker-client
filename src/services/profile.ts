import axios from 'src/config/axios';

const getProfile = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/profile')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export default getProfile;

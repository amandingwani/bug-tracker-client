import axios from 'src/config/axios';

const getProfile = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios.get('/user/profile');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

export default getProfile;
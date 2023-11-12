import axios from 'src/config/axios';

const loginWithGoogle = (googleToken: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post('/auth/login', {
                token: googleToken,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const authService = { loginWithGoogle };

export default authService;
import axios from 'src/config/axios';

const loginWithGoogle = (code: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post('/auth/google', {
                code: code,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const authService = { loginWithGoogle };

export default authService;
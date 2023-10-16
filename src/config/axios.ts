import axios from 'axios';
import { BUG_TRACKER_API_URL } from './env';

// creating an instance of axios
const instance = axios.create({
    baseURL: BUG_TRACKER_API_URL,
    withCredentials: true
});

export default instance;

// https://github.com/axios/axios#config-defaults
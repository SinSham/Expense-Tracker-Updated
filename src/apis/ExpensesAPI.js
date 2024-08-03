import axios from 'axios';

// Create an Axios instance with the base URL and interceptors to attach the token
const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1'
});

// Add a request interceptor to attach the token to each request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust according to where you store the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

import axios from 'axios';

const createHttp = (option = {}) => {
    const instance = axios.create({
        baseURL: '',
        timeout: 5000,
        headers: {},
        ...option
    });
    instance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        if (response.status === 200) {
            return response.data;
        }
        return Promise.reject(response.data);
    }, function (error) {
        return Promise.reject(error);
    });
    return instance;
}

export const $dogCeo = createHttp({ baseURL: 'https://dog.ceo/api' });

export const $ompweb = createHttp({ baseURL: '/omp-web' });

import axios from 'axios';

import serverConfig from '../config/server';

const api = axios.create({
    baseURL: serverConfig.baseURL,
});

export default api;

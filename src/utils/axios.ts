import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理，例如添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response.data;
    },
    (error) => {
        // 处理错误
        return Promise.reject(error);
    }
);

export default instance;
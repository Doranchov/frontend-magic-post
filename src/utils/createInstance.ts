import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { http } from '@/utils/http';
import useAuthStore from '@/stores/useAuthStore';
import type { Account, Token } from '@/interfaces';

const authStore = useAuthStore();

const refreshToken = async () => {
    try {
        const res = await http.post(
            '/auth/refresh',
            {},
            {
                withCredentials: true,
            },
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxiosJwt = (user: Account | null) => {
    const newInstance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:8181',
    });

    if (user !== null) {
        newInstance.interceptors.request.use(
            async (config) => {
                let date = new Date();
                const decodeToken: Token = jwtDecode(user.accessToken);
                if (decodeToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken();
                    const refreshUser = {
                        ...user,
                        accessToken: data?.accessToken,
                    };
                    authStore.userInfo = refreshUser;
                    localStorage.setItem('userInfo', JSON.stringify(refreshUser));
                    console.log('relogin successful');
                    config.headers['token'] = 'Bearer ' + data?.accessToken;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            },
        );
    }
    return newInstance;
};

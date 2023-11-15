import { defineStore } from 'pinia';
import type { Account } from '@/interfaces';
import { AuthServices } from '@/services/auth/AuthServices';
import { ElMessage } from 'element-plus';

interface AuthState {
    isLoggedIn: boolean;
    userInfo: Account;
    error: string;
}

const loggedInData = localStorage.getItem('isLoggedIn');
const userInfoData = localStorage.getItem('userInfo');
const isLoggedIn: boolean = loggedInData ? JSON.parse(loggedInData) : false;
const userInfo: Account = userInfoData
    ? JSON.parse(userInfoData)
    : {
          _id: '',
          username: '',
          email: '',
          password: '',
          role: '',
          address: '',
          phone: '',
          avatar: '',
          refreshToken: '',
          accessToken: '',
      };

const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        isLoggedIn: isLoggedIn,
        userInfo: userInfo,
        error: '',
    }),
    getters: {
        getCurrentUser: (state) => state.userInfo,
    },
    actions: {
        async login(user: any) {
            try {
                const res = await AuthServices.login(user);
                console.log(res.status);
                if (res.status === 200) {
                    this.userInfo = res.data.data;
                    this.isLoggedIn = true;
                    this.error = '';
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                } else {
                    this.error = 'Tên email hoặc mật khẩu sai.';
                }
            } catch (error) {
                console.error('fail to sign in ' + error);
            }
        },

        async logout(user: any, httpJwt: any) {
            try {
                await AuthServices.logout(user, httpJwt);
                this.userInfo = {
                    _id: '',
                    username: '',
                    email: '',
                    password: '',
                    role: '',
                    address: '',
                    phone: '',
                    avatar: '',
                    refreshToken: '',
                    accessToken: '',
                    workPlace: '',
                };
                this.isLoggedIn = false;
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userInfo');
                console.log('logout success');
            } catch (error) {
                console.error('fail to log out ' + error);
            }
        },
    },
});

export default useAuthStore;

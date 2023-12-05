import { defineStore } from 'pinia';
import type { Account } from '@/interfaces';
import { AuthServices } from '@/services/auth/AuthServices';
import { ElMessage } from 'element-plus';
import router from '@/router';

interface AuthState {
    isLoggedIn: boolean;
    userInfo: Account;
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
    }),
    getters: {
        getCurrentUser: (state) => state.userInfo,
    },
    actions: {
        async login(user: any) {
            try {
                const res = await AuthServices.login(user);
                this.userInfo = res.data.data;
                this.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                ElMessage({
                    type: 'success',
                    message: 'Đăng nhập thành công.',
                });
                await router.push({ name: 'home' });
            } catch (error) {
                ElMessage.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
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
                ElMessage({
                    type: 'success',
                    message: 'Đăng xuất thành công.',
                });
            } catch (error) {
                console.error('fail to log out ' + error);
                ElMessage.error('Đăng xuất không thành công. Vui lòng thử lại.');
            }
        },
    },
});

export default useAuthStore;

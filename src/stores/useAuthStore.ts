import { defineStore } from 'pinia';
import type { Account } from '@/interfaces';
import { AuthServices } from '@/services/auth/AuthServices';

interface AuthState {
    isLoggedIn: boolean;
    userInfo: Account | null;
}

const loggedInData = localStorage.getItem('isLoggedIn');
const isLoggedIn: boolean = loggedInData ? JSON.parse(loggedInData) : false;

const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        isLoggedIn: isLoggedIn,
        userInfo: null,
    }),
    actions: {
        async login(user: any) {
            try {
                this.userInfo = await AuthServices.login(user);
                this.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                console.log('login success');
            } catch (error) {
                console.error('fail to sign in ' + error);
            }
        },

        async logout(user: any, httpJwt: any) {
            try {
                await AuthServices.logout(user, httpJwt);
                this.userInfo = null;
                this.isLoggedIn = false;
                localStorage.removeItem('isLoggedIn');
                console.log('logout success');
            } catch (error) {
                console.error('fail to log out ' + error);
            }
        },
    },
});

export default useAuthStore;

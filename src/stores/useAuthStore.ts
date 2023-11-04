import { defineStore } from 'pinia';
import type { Account } from '@/interfaces';

interface AuthState {
    isLogged: boolean
    userInfo?: Account
}

const loggedInData = localStorage.getItem("isLogged")
const isLoggedIn: boolean = loggedInData ? JSON.parse(loggedInData) : false


const useAuthStore =  defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: isLoggedIn,
        userInfo: null
    }),
    actions: {

    }
})
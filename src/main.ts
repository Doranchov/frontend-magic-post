import './assets/main.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import useAuthStore from '@/stores/useAuthStore';

const app = createApp(App);

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const login = authStore.isLoggedIn;
    const role = authStore.userInfo?.role;
    if (to.matched.some((record) => record.meta.requiresAuth) && !login) {
        next({ path: '/login' });
    } else if (login) {
        switch (to.name) {
            case 'login' || 'register':
                next({ path: '/' });
                break;
            default:
                next();
                break;
        }
    } else {
        next();
    }
});

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');

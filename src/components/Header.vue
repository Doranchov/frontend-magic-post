<template>
    <el-header id="header">
        <div class="header-content">
            <template v-if="isLoggedIn">
                <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                    <MenuHeader :role="role" />

                    <div class="flex-grow"></div>
                    <el-menu-item class="no-hover">
                        <el-dropdown>
                            <span class="name-user">
                                <el-avatar src="" />
                                <span class="avatar">{{ role }} - Le Nghia</span>
                            </span>

                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>
                                        <router-link to="/profile">Hồ sơ cá nhân</router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <router-link to="/settings">Cài đặt</router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <span @click="() => handleLogout(user)">Đăng xuất</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </template>

            <template v-else>
                <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                    <el-menu-item> Magic Post </el-menu-item>
                    <el-menu-item> Trang chủ </el-menu-item>
                    <el-menu-item> Về chúng tôi </el-menu-item>
                    <div class="flex-grow"></div>
                    <el-menu-item class="no-hover">
                        <el-button type="primary" plain @click="changeRegisterPage">Đăng ký</el-button>
                    </el-menu-item>
                    <el-menu-item class="no-hover">
                        <el-button type="primary" @click="changeLoginPage"> Đăng nhập </el-button>
                    </el-menu-item>
                </el-menu>
            </template>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import MenuHeader from '@/components/menu/MenuHeader.vue';
import router from '@/router';
import useAuthStore from '@/stores/useAuthStore';
import { computed } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { createAxiosJwt } from '@/utils/createInstance';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.userInfo);
const httpJwt = createAxiosJwt(authStore.userInfo);

const roleArr = [
    'admin',
    'customer',
    'transaction_point_manager',
    'gathering_point_manager',
    'transaction_point_staff',
    'gathering_point_staff',
];
const role = roleArr[5];

const handleLogout = (user: any) => {
    if (user !== null) {
        loadingFullScreen();
        authStore.logout(user, httpJwt);
        router.push({ name: 'login' });
    }
};

const changeRegisterPage = () => {
    router.push({ name: 'register' });
};

const changeLoginPage = () => {
    router.push({ name: 'login' });
};
</script>

<style scoped>
#header {
    position: fixed;
    width: 100%;
    z-index: 12;
}

.flex-grow {
    flex-grow: 1;
}

.menu .no-hover:hover {
    color: inherit !important;
    background-color: transparent !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}
</style>

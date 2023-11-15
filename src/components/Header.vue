<template>
    <el-header id="header">
        <div class="header-content">
            <template v-if="isLoggedIn">
                <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                    <MenuHeader :role="user.role" />

                    <div class="flex-grow"></div>
                    <el-menu-item class="no-hover">
                        <el-dropdown>
                            <span class="name-user">
                                <el-avatar :src="user.avatar" />
                                <span class="avatar">{{ user.username }}</span>
                            </span>

                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="handleRoute('/profile')">
                                        Hồ sơ cá nhân
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="handleRoute('/settings')"> Cài đặt </el-dropdown-item>
                                    <el-dropdown-item @click="() => handleLogout(user)"> Đăng xuất </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </template>

            <template v-else>
                <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                    <el-menu-item @click="handleRoute('/')"> Magic Post </el-menu-item>
                    <el-menu-item @click="handleRoute('/')" index="1"> Trang chủ </el-menu-item>
                    <el-menu-item @click="handleRoute('/about')" index="2"> Về chúng tôi </el-menu-item>
                    <div class="flex-grow"></div>
                    <el-menu-item class="no-hover">
                        <el-button type="primary" plain @click="handleRoute('/register')">Đăng ký</el-button>
                    </el-menu-item>
                    <el-menu-item class="no-hover">
                        <el-button type="primary" @click="handleRoute('/login')"> Đăng nhập </el-button>
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
import { handleRoute } from '@/utils/handleRoute';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.userInfo);

const handleLogout = (user: any) => {
    if (user !== null) {
        const httpJwt = createAxiosJwt(user);
        loadingFullScreen();
        authStore.logout(user, httpJwt);
        router.push({ name: 'login' });
    }
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
    color: #fff !important;
    background-color: transparent !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}
.menu {
    color: hidden;
}
</style>

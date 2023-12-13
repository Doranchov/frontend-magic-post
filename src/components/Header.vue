<template>
    <el-header id="header">
        <div class="header-content">
            <template v-if="isLoggedIn">
                <el-menu class="menu" mode="horizontal" :ellipsis="false" menu-trigger="click">
                    <MenuHeader :role="user.role" />

                    <div class="flex-grow"></div>
                    <el-menu-item class="no-hover">
                        <span class="name-user" @click="handleOpenDrawer(user)">
                            <el-avatar :src="user.avatar" />
                            <span class="avatar">{{ user.username }}</span>
                        </span>
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
    <InfoDrawer ref="infoRef" />
</template>

<script setup lang="ts">
import MenuHeader from '@/components/menu/MenuHeader.vue';
import router from '@/router';
import useAuthStore from '@/stores/useAuthStore';
import { computed, ref } from 'vue';
import { createAxiosJwt } from '@/utils/createInstance';
import { handleRoute } from '@/utils/handleRoute';
import InfoDrawer from '@/components/drawers/InfoDrawer.vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.userInfo);
const httpJwt = createAxiosJwt(user.value);
const infoRef = ref<InstanceType<typeof InfoDrawer> | null>(null);

const handleOpenDrawer = (user: any) => {
    if (isLoggedIn.value && user) {
        infoRef.value?.openDrawer(user);
    }
    // isCollapse.value = false;
};

const handleLogout = (user: any) => {
    if (user !== null) {
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
    background-color: #fff;
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
.menu {
    background-color: rgba(255, 255, 255, 0.5);
}
</style>

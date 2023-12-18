<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { handleRoute } from '@/utils/handleRoute';

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const userInfo = ref<any>();

function openDrawer(user: any) {
    visible.value = true;
    userInfo.value = user;
}

const handleClick = (path: any) => {
    if (path) {
        handleRoute(path);
    }
    visible.value = false;
};

const logout = async (user: any) => {
    if (user !== null) {
        await authStore.logout(user, httpJwt);
        await router.push({ name: 'login' });
    }
    visible.value = false;
};

defineExpose({
    openDrawer,
});
</script>
<template>
    <el-drawer v-model="visible" title="I am the title" :with-header="false" size="20%">
        <div class="name-user">
            <el-avatar :src="userInfo?.avatar" class="avatar-image" />
            <span class="avatar">{{ userInfo?.username }}</span>
        </div>
        <el-menu mode="vertical" :ellipsis="false" class="menu-bar" menu-trigger="click">
            <el-menu-item @click="handleClick('/profile')"> Hồ sơ cá nhân </el-menu-item>
            <el-menu-item @click="logout"> Đăng xuất </el-menu-item>
            <el-menu-item @click="visible = false"> Đóng </el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<style scoped>
.el-menu {
    border: none;
}

.avatar-image {
    width: auto;
}

.name-user {
    display: flex;
    align-items: center;
    padding: 10px 20px;
}

.avatar {
    margin-left: 8px;
    width: 75%;
}
</style>

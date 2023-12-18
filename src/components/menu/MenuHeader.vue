<template>
    <template v-if="props.role === Role.ADMIN_ROLE" background-color="#fff">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-sub-menu index="2">
            <template #title>Quản lý tài khoản</template>
            <el-menu-item index="2-1" @click="handleRoute('/admin/gathering/account')">Tại điểm tập kết</el-menu-item>
            <el-menu-item index="2-2" @click="handleRoute('/admin/transaction/account')"
                >Tại điểm giao dịch</el-menu-item
            >
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>Quản lý hàng hóa</template>
            <el-menu-item index="3-1" @click="handleRoute('/admin/gathering/goods')">Tại điểm tập kết</el-menu-item>
            <el-menu-item index="3-2" @click="handleRoute('/admin/transaction/goods')">Tại điểm giao dịch</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" @click="handleRoute('/about')"> Về Chúng tôi </el-menu-item>
    </template>

    <template v-else-if="props.role === Role.CUSTOMER_ROLE" background-color="#fff">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-menu-item index="2" @click="handleRoute('/about')"> Về chúng tôi </el-menu-item>
        <el-menu-item index="3" @click="handleRoute('/search')"> Tra cứu đơn hàng </el-menu-item>
    </template>

    <template v-else-if="props.role === Role.TRANSACTION_MANAGER_ROLE">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-menu-item index="2" @click="handleRoute('/manage/transaction/account')"> Quản lý tài khoản </el-menu-item>
        <el-menu-item index="3" @click="handleRoute('/manage/transaction/goods')"> Quản lý hàng hóa</el-menu-item>
    </template>

    <template v-else-if="props.role === Role.GATHERING_MANAGER_ROLE">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-menu-item index="2" @click="handleRoute('/manage/gathering/account')"> Quản lý tài khoản </el-menu-item>
        <el-menu-item index="3" @click="handleRoute('/manage/gathering/goods')"> Quản lý hàng hóa</el-menu-item>
    </template>

    <template v-else-if="props.role === Role.TRANSACTION_STAFF_ROLE">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-menu-item index="2" @click="handleRoute('/staff/transaction/create-package')"> Tạo đơn hàng </el-menu-item>
        <el-menu-item index="3" @click="handleRoute('/staff/transaction/goods')"> Xác nhận đơn hàng </el-menu-item>
        <el-menu-item index="4" @click="handleRoute('/staff/transaction/store')"> Kho hàng </el-menu-item>
    </template>

    <template v-else-if="props.role === Role.GATHERING_STAFF_ROLE">
        <el-menu-item @click="handleRoute('/')">
            <el-image src="src/assets/logo.png" style="height: 100%"></el-image>
        </el-menu-item>
        <el-menu-item index="1" @click="handleRoute('/')"> Trang chủ </el-menu-item>
        <el-menu-item index="2" @click="handleRoute('/staff/gathering/goods')"> Xác nhận đơn hàng </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import Role from '@/constants/roles';
import { handleRoute } from '@/utils/handleRoute';
const props = defineProps<{
    role: string;
}>();
</script>

<style scoped></style>

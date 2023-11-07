<template>
    <template v-if="props.role === 'admin'">
        <el-menu-item index="1"> <router-link to="/">Magic Post</router-link> </el-menu-item>
        <el-menu-item index="2"> <router-link to="/">Trang chủ </router-link></el-menu-item>
        <el-sub-menu index="3">
            <template #title>Quản lý tài khoản</template>
            <el-menu-item index="3-1"
                ><router-link to="/admin/gathering/account">Tại điểm tập kết</router-link></el-menu-item
            >
            <el-menu-item index="3-2"
                ><router-link to="/admin/transaction/account">Tại điểm giao dịch</router-link></el-menu-item
            >
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>Quản lý hàng hóa</template>
            <el-menu-item index="4-1"
                ><router-link to="/admin/gathering/goods">Tại điểm tập kết</router-link></el-menu-item
            >
            <el-menu-item index="4-2"
                ><router-link to="/admin/transaction/goods">Tại điểm giao dịch</router-link></el-menu-item
            >
        </el-sub-menu>
    </template>

    <template v-else-if="props.role === 'customer'">
        <el-menu-item index="1"> <router-link to="/">Magic Post</router-link> </el-menu-item>
        <el-menu-item index="2"> <router-link to="/">Trang chủ </router-link></el-menu-item>
        <el-menu-item index="3">
            <router-link to="/about"> Về chúng tôi </router-link>
        </el-menu-item>
        <el-menu-item index="4"> Tra cứu đơn hàng </el-menu-item>
    </template>

    <template v-else-if="props.role === 'transaction_point_manager'">
        <el-menu-item index="1"> <router-link to="/">Magic Post</router-link> </el-menu-item>
        <el-menu-item index="2"> <router-link to="/">Trang chủ </router-link></el-menu-item>
        <el-menu-item index="3">
            <router-link to="/manage/transaction/account">Quản lý tài khoản</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link to="/manage/transaction/goods">Quản lý hàng hóa</router-link></el-menu-item
        >
    </template>

    <template v-else-if="props.role === 'gathering_point_manager'">
        <el-menu-item index="1"> <router-link to="/">Magic Post</router-link> </el-menu-item>
        <el-menu-item index="2"> <router-link to="/">Trang chủ </router-link></el-menu-item>
        <el-menu-item index="3">
            <router-link to="/manage/gathering/account">Quản lý tài khoản</router-link>
        </el-menu-item>
        <el-menu-item index="4"> <router-link to="/manage/gathering/goods">Quản lý hàng hóa</router-link></el-menu-item>
    </template>

    <template v-else-if="props.role === 'transaction_point_staff'">
        <el-menu-item index="1">
            <router-link to="/"> Magic Post </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/"> Trang chủ </router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link to="/staff/transaction/create-package"> Tạo đơn hàng </router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link to="/staff/transaction/goods"> Xác nhận đơn hàng</router-link>
        </el-menu-item>
    </template>

    <template v-else-if="props.role === 'gathering_point_staff'">
        <el-menu-item index="1"> <router-link to="/">Magic Post</router-link> </el-menu-item>
        <el-menu-item index="2"> <router-link to="/">Trang chủ </router-link></el-menu-item>
        <el-menu-item index="3">
            <router-link to="/staff/gathering/create-package">Tạo đơn hàng</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link to="/staff/gathering/goods"> Xác nhận đơn hàng</router-link>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
const props = defineProps<{
    role: string;
}>();
</script>

<style scoped></style>

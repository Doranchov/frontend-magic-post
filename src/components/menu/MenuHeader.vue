<template>
    <template v-if="props.role === 'admin'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-sub-menu index="3">
            <template #title>Quản lý tài khoản</template>
            <el-menu-item index="3-1">Tại điểm tập kết</el-menu-item>
            <el-menu-item index="3-2">Tại điểm giao dịch</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>Quản lý hàng hóa</template>
            <el-menu-item index="4-1">Tại điểm tập kết</el-menu-item>
            <el-menu-item index="4-2">Tại điểm giao dịch</el-menu-item>
        </el-sub-menu>
    </template>

    <template v-else-if="props.role === 'customer'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-menu-item index="3"> Về chúng tôi </el-menu-item>
        <el-menu-item index="4"> Tra cứu đơn hàng </el-menu-item>
    </template>

    <template v-else-if="props.role === 'transaction_point_manager'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-menu-item index="3"> Quản lý tài khoản </el-menu-item>
        <el-menu-item index="4"> Quản lý hàng hóa</el-menu-item>
    </template>

    <template v-else-if="props.role === 'gathering_point_manager'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-menu-item index="3"> Quản lý tài khoản </el-menu-item>
        <el-menu-item index="4"> Quản lý hàng hóa</el-menu-item>
    </template>

    <template v-else-if="props.role === 'transaction_point_staff'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-menu-item index="3"> Tạo đơn hàng </el-menu-item>
        <el-menu-item index="4"> Thống kê đơn hàng </el-menu-item>
    </template>

    <template v-else-if="props.role === 'gathering_point_staff'">
        <el-menu-item index="1"> Magic Post </el-menu-item>
        <el-menu-item index="2"> Trang chủ </el-menu-item>
        <el-menu-item index="3"> Tạo đơn hàng </el-menu-item>
        <el-menu-item index="4"> Xác nhận đơn hàng </el-menu-item>
    </template>
</template>

<script setup lang="ts">
const props = defineProps<{
    role: string;
}>();
</script>

<style scoped></style>

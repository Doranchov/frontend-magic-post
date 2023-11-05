<template>
    <el-dialog v-model="visible" title="Chỉnh sửa thông tin tài khoản" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top">
            <el-form-item label="Họ tên">
                <el-input v-model="username" type="text" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="email" type="text" />
            </el-form-item>
            <el-form-item label="Mật khẩu">
                <el-input v-model="password" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại">
                <el-input v-model="phone" type="text" />
            </el-form-item>
            <el-form-item label="Chức vụ">
                <el-input v-model="role" type="text" disabled placeholder="Nhân viên điểm tập kết" />
            </el-form-item>
            <el-form-item label="Địa điểm làm việc">
                <el-input v-model="address" type="text" disabled placeholder="Hà Nội" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Huỷ bỏ</el-button>
                <el-button type="primary" @click="visible = false"> Tạo mới </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '@/interfaces/index';

const visible = ref<boolean>(false);
const postForm = ref<User>();

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const address = ref<string>('Kim Mã');
const role = ref<string>('Nhân viên điểm giao dịch');
const phone = ref<string>('');

async function openModal() {
    visible.value = true;
}

defineExpose({
    openModal,
});
</script>

<style scoped></style>

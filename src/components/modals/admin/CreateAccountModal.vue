<template>
    <el-dialog v-model="visible" title="Tạo tài khoản cho trưởng điểm" width="40%" top="8vh">
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
                <el-select v-model="role" class="m-2" placeholder="Các chức vụ">
                    <el-option
                        v-for="(item, index) in roleOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Địa điểm làm việc">
                <el-select v-model="address" class="m-2" placeholder="Địa điểm">
                    <el-option
                        v-for="(item, index) in addressOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
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
const roleOptions = [
    {
        label: 'Trưởng điểm tập kết',
        value: '1',
    },
    {
        label: 'Trưởng điểm giao dịch',
        value: '2',
    },
];

const addressOptions = [
    {
        label: 'Hà Nội',
        value: 'Hà Nội',
    },
    {
        label: 'Hải Dương',
        value: 'Hải Dương',
    },
    {
        label: 'Hưng Yên',
        value: 'Hưng Yên',
    },
    {
        label: 'Quảng Ninh',
        value: 'Quảng Ninh',
    },
];

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const role = ref<string>('');
const address = ref<string>('');
const phone = ref<string>('');

async function openModal() {
    visible.value = true;
}

defineExpose({
    openModal,
});
</script>

<style scoped></style>

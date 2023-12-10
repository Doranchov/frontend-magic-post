<template>
    <el-dialog v-model="visible" title="Chỉnh sửa thông tin tài khoản" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top" ref="postFormRef" :rules="rules">
            <el-form-item label="Họ tên" prop="username">
                <el-input v-model="postForm.username" type="text" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="postForm.email" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone">
                <el-input v-model="postForm.phone" type="text" />
            </el-form-item>
            <el-form-item label="Chức vụ">
                <el-input v-model="postForm.role" type="text" disabled />
            </el-form-item>
            <el-form-item label="Địa điểm làm việc">
                <el-input v-model="postForm.workPlace" type="text" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Huỷ bỏ</el-button>
                <el-button type="primary" :loading="updateLoading" @click="submitForm(postFormRef)"> Sửa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import type { ElForm, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ManagerServices } from '@/services/user/ManagerServices';

const props = defineProps<{
    callFunction: () => Promise<void>;
}>();

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const staffId = ref<string>('');
const visible = ref<boolean>(false);
const updateLoading = ref<boolean>(false);
const postFormRef = ref<typeof ElForm | null>(null);
const postForm = ref({
    username: '',
    email: '',
    phone: '',
    role: '',
    workPlace: '',
});
const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: true,
            message: 'Vui lòng nhập email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Vui lòng nhập đúng email',
            trigger: ['blur', 'change'],
        },
    ],
    phone: [
        {
            required: true,
            message: 'Vui lòng nhập số điện thoại',
            trigger: 'blur',
        },
    ],
});

function openModal(rowData: any) {
    visible.value = true;
    staffId.value = rowData._id;
    postForm.value.username = rowData.username;
    postForm.value.email = rowData.email;
    postForm.value.phone = rowData.phone;
    postForm.value.role = rowData.role;
    postForm.value.workPlace = rowData.workPlace;
}

const handleUpdate = async (data: any) => {
    updateLoading.value = true;
    try {
        await ManagerServices.editStaffAccount(authStore.userInfo, data, staffId.value, httpJwt);
        visible.value = false;
        await props.callFunction();
        ElMessage({
            type: 'success',
            message: 'Cập nhật tài khoản thành công.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Cập nhật tài khoản thất bại.');
    } finally {
        updateLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            handleUpdate(postForm.value);
        } else {
            return false;
        }
    });
};

defineExpose({
    openModal,
});
</script>

<style scoped></style>

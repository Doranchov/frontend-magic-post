<template>
    <el-dialog v-model="visible" title="Thay đổi mật khẩu" width="50%" top="12vh">
        <el-form :model="editForm" label-position="left" ref="editFormRef" :rules="rules" label-width="150px">
            <el-form-item label="Mật khẩu cũ" prop="oldPassword">
                <el-input v-model="editForm.oldPassword" type="password" :show-password="true" />
            </el-form-item>
            <el-form-item label="Mật khẩu mới:" prop="newPassword">
                <el-input v-model="editForm.newPassword" type="password" :show-password="true" />
            </el-form-item>
            <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
                <el-input v-model="editForm.confirmPassword" type="password" :show-password="true" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Huỷ bỏ</el-button>
                <el-button type="primary" :loading="editLoading" @click="submitForm(editFormRef)"> Lưu lại </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { AuthServices } from '@/services/auth/AuthServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ElMessage } from 'element-plus';
import router from '@/router';

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const editLoading = ref<boolean>(false);
const editFormRef = ref<typeof ElForm | null>(null);
const editForm = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});
const rules = reactive<FormRules>({
    oldPassword: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu cũ',
            trigger: 'blur',
        },
    ],
    newPassword: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu mới',
            trigger: 'blur',
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: 'Vui lòng nhập lại mật khẩu mới',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== editForm.value.newPassword) {
                    callback('Mật khẩu xác nhận không khớp');
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        },
    ],
});

const handleChangePassword = async (data: any) => {
    editLoading.value = true;
    try {
        await AuthServices.changePassword(authStore.userInfo, data, httpJwt);
        ElMessage({
            type: 'success',
            message: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
        });
        await authStore.logout(authStore.userInfo, httpJwt);
        await router.push({ name: 'home' });
    } catch (e) {
        console.log(e);
        ElMessage.error('Thay đổi mật khẩu thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
        editLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            handleChangePassword(editForm.value);
        } else {
            return false;
        }
    });
};

function openModal() {
    visible.value = true;
}

defineExpose({
    openModal,
});
</script>

<style scoped></style>

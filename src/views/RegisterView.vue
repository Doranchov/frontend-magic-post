<template>
    <div class="container">
        <el-row justify="center">
            <el-col :xs="16" :sm="14" :md="12" :lg="8">
                <el-card>
                    <template #header>
                        <h2 class="title">Đăng ký</h2>
                    </template>
                    <el-form label-position="top" :model="registerForm" :rules="rules" ref="registerFormRef">
                        <el-form-item label="Tên người dùng" prop="username">
                            <el-input v-model="registerForm.username" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="registerForm.email" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Số điện thoại" prop="phone">
                            <el-input v-model="registerForm.phone" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Mật khẩu" prop="password">
                            <el-input v-model="registerForm.password" type="password" :show-password="true" />
                        </el-form-item>
                        <el-form-item label="Xác nhận mật khẩu" prop="confirmPassword">
                            <el-input v-model="registerForm.confirmPassword" type="password" :show-password="true" />
                        </el-form-item>
                        <el-form-item>
                            <div class="action">
                                <div class="redirect">
                                    Bạn đã có tài khoản?
                                    <router-link to="/login" class="to-login">Đăng nhập</router-link>
                                </div>
                                <el-button
                                    class="btn-submit"
                                    type="primary"
                                    :loading="submitLoading"
                                    @click="submitForm(registerFormRef)"
                                    @keyup.enter="submitForm(registerFormRef)"
                                    native-type="submit"
                                    >Đăng ký
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import router from '@/router/index';
import { ElForm, ElMessage, type FormRules } from 'element-plus';
import { AuthServices } from '@/services/auth/AuthServices';

const rules = reactive<FormRules<any>>({
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
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== registerForm.password) {
                    callback('Mật khẩu xác nhận không khớp');
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        },
    ],
});
const registerFormRef = ref<typeof ElForm | null>(null);
const registerForm = reactive<any>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
});
const submitLoading = ref<boolean>(false);

const register = async (user: any) => {
    submitLoading.value = true;
    try {
        await AuthServices.register(user);
        console.log('Register successful');
        ElMessage({
            type: 'success',
            message: 'Đăng ký thành công.',
        });
        await router.push({ name: 'home' });
    } catch (error) {
        console.error('Register failed: ' + error);
        ElMessage.error('Đăng ký thất bại. Kiểm tra lại thông tin.');
    } finally {
        submitLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate(async (valid: any) => {
        loadingFullScreen();
        if (valid) {
            await register(registerForm);
        } else {
            return false;
        }
    });
};
onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.title {
    text-align: center;
}

.action {
    display: flex;
    align-items: center;
    width: 100%;
}

.redirect {
    font-size: 16px;
    width: 200%;
}

.to-login:hover {
    text-decoration: underline;
}

.btn-submit {
    width: 100%;
}
</style>

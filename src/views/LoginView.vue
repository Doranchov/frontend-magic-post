<template>
    <div class="container">
        <el-row justify="center">
            <el-col :xs="16" :sm="14" :md="12" :lg="8">
                <el-card>
                    <template #header><h2 class="title">Đăng nhập</h2></template>
                    <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginFormRef">
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="loginForm.email" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Mật khẩu" prop="password">
                            <el-input v-model="loginForm.password" type="password" :show-password="true" />
                        </el-form-item>
                        <el-form-item>
                            <div class="action">
                                <div class="redirect">
                                    Bạn chưa có tài khoản?
                                    <router-link to="/register" class="to-register">Đăng ký</router-link>
                                </div>
                                <el-button
                                    class="btn-submit"
                                    :loading="submitLoading"
                                    type="primary"
                                    @click="submitForm(loginFormRef)"
                                    @keyup.enter="submitForm(loginFormRef)"
                                    native-type="submit"
                                    >Đăng nhập
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
import { ElForm, type FormRules } from 'element-plus';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore();
const submitLoading = ref<boolean>(false);

const loginForm = reactive({
    email: '',
    password: '',
});
const rules = reactive<FormRules<any>>({
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
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
        },
    ],
});
const loginFormRef = ref<typeof ElForm | null>(null);

const login = async (user: any) => {
    try {
        submitLoading.value = true;
        await authStore.login(user);
    } catch (e) {
        console.error(e);
    } finally {
        submitLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate(async (valid: any) => {
        if (valid) {
            await login(loginForm);
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

.to-register:hover {
    text-decoration: underline;
}

.btn-submit {
    width: 100%;
}
</style>

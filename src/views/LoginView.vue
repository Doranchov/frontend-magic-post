<template>
    <div class="container">
        <el-row justify="center">
            <el-col :xs="18" :sm="16" :md="14" :lg="10">
                <h2 class="title">Đăng nhập</h2>
                <el-form label-position="top" :model="loginForm" ref="loginFormRef">
                    <el-form-item
                        label="Email"
                        prop="email"
                        :rules="[
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
                        ]"
                    >
                        <el-input v-model="loginForm.email" type="email" />
                    </el-form-item>
                    <el-form-item
                        label="Mật khẩu"
                        prop="password"
                        :rules="[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input v-model="loginForm.password" type="password" :show-password="true" />
                    </el-form-item>
                    <el-button class="btn-submit" type="primary" @click="submitForm(loginFormRef)"
                        >Đăng nhập
                    </el-button>
                </el-form>
                <span>
                    Bạn chưa có tài khoản?
                    <router-link to="/register">Đăng ký</router-link>
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import router from '@/router/index';
import { ElForm, ElMessage } from 'element-plus';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore();
const submitLoading = ref<boolean>(false);

const loginForm = reactive({
    email: '',
    password: '',
});

const loginFormRef = ref<typeof ElForm | null>(null);

const login = async (user: any) => {
    try {
        submitLoading.value = true;
        await authStore.login(user);
    } catch (e) {
        ElMessage.error(authStore.error);
    } finally {
        submitLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            login(loginForm);
            loadingFullScreen();
            router.push({ name: 'home' });
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
.container {
}

.title {
    text-align: center;
}

.btn-submit {
    width: 100%;
}
</style>

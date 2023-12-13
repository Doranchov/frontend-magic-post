<template>
    <div class="container">
        <el-row :justify="isMobile ? 'center' : 'start'">
            <el-col :span="24">
                <div class="profile-info">
                    <el-form
                        :model="userInfoForm"
                        :rules="rules"
                        ref="userInfoFormRef"
                        label-position="top"
                        class="info-form"
                    >
                        <el-row :gutter="isMobile ? 0 : 40" justify="space-around">
                            <el-col :span="isMobile ? 24 : 8">
                                <el-form-item class="avatar-uploader" prop="avatar">
                                    <input
                                        type="file"
                                        class="avatar-input"
                                        ref="avatarInput"
                                        @change="handleChangeAvatar"
                                    />
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="anh dai dien" />
                                </el-form-item>
                                <h1>Hồ sơ cá nhân</h1></el-col
                            >
                            <el-col :span="isMobile ? 18 : 12" class="user-info">
                                <el-form-item label="Họ tên:" prop="username">
                                    <el-input v-model="userInfoForm.username" type="text" />
                                </el-form-item>
                                <el-form-item label="Email:" prop="email">
                                    <el-input v-model="userInfoForm.email" type="email" />
                                </el-form-item>
                                <el-form-item label="Vai trò:" prop="role">
                                    <el-input v-model="role" :disabled="true" />
                                </el-form-item>
                                <template v-if="!isCustomer()">
                                    <el-form-item label="Nơi làm việc:">
                                        <el-input v-model="workPlace" :disabled="true" />
                                    </el-form-item>
                                </template>
                                <el-form-item label="Số điện thoại:" prop="phone">
                                    <el-input v-model="userInfoForm.phone" type="text" />
                                </el-form-item>
                                <el-form-item label="Địa chỉ:" prop="address">
                                    <div class="address-option">
                                        <el-select
                                            placeholder="Chọn tỉnh/thành phố"
                                            v-model="province"
                                            remote
                                            :remote-method="loadProvinces"
                                            @change="handleChooseProvince"
                                        >
                                            <el-option
                                                v-for="(item, index) in provinceOptions"
                                                :key="index"
                                                :label="item.name"
                                                :value="item._id"
                                            />
                                        </el-select>
                                        <el-select
                                            placeholder="Chọn quận/huyện"
                                            v-model="userInfoForm.address"
                                            remote
                                            :remote-method="loadDistricts"
                                        >
                                            <el-option
                                                v-for="(item, index) in districtOptions"
                                                :key="index"
                                                :label="item.name"
                                                :value="item._id"
                                            />
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        :loading="loadingEdit"
                                        @click="submitForm(userInfoFormRef)"
                                        @keyup.enter="submitForm(userInfoFormRef)"
                                        native-type="submit"
                                        >Lưu lại</el-button
                                    >
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { RoleServices } from '@/services/role/RoleServices';
import useAuthStore from '@/stores/useAuthStore';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { UserServices } from '@/services/user/UserServices';
import { ElForm, ElMessage, type FormRules } from 'element-plus';
import router from '@/router';
import { createAxiosJwt } from '@/utils/createInstance';
import { DistrictServices } from '../services/district/DistrictServices';

const authStore = useAuthStore();
const user = computed(() => authStore.userInfo);
const httpJwt = createAxiosJwt(authStore.userInfo);
const loadingEdit = ref(false);
const userInfoForm = ref<{
    username: string;
    email: string;
    phone: string;
    address: string;
    avatar: any | null;
}>({
    username: user.value.username,
    email: user.value.email,
    phone: user.value.phone,
    address: '',
    avatar: null,
});
const userInfoFormRef = ref<typeof ElForm | null>(null);
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
    address: [
        {
            required: true,
            message: 'Vui lòng chọn địa chỉ thường trú',
            trigger: ['blur', 'change'],
        },
    ],
    avatar: [
        {
            required: true,
            message: 'Vui lòng chọn ảnh đại diện',
            trigger: ['blur', 'change'],
        },
    ],
});
const imageUrl: string = user.value.avatar;
const province = ref<string>('');
const district = ref<string>('');
const provinceOptions = ref<any[]>([]);
const districtOptions = ref<any[]>([]);
const workPlace = ref<string>('');
const avatarInput = ref<HTMLInputElement | null>(null);
const isMobile = ref<boolean>(false);
const role = ref<string>('');

const isCustomer = () => {
    if (role.value === 'Khách hàng') {
        return true;
    } else {
        return false;
    }
};

const handleResize = () => {
    isMobile.value = window.innerWidth <= 992;
};

const handleChangeAvatar = () => {
    if (avatarInput.value?.files && avatarInput.value.files[0]) {
        userInfoForm.value.avatar = avatarInput.value.files[0];
    }
};

const loadProvinces = async () => {
    provinceOptions.value = await ProvinceServices.getAll();
};

const loadDistricts = async (provinceId: any) => {
    districtOptions.value = await DistrictServices.getDistrictByProvinceId(provinceId);
};

const handleChooseProvince = () => {
    districtOptions.value = [];
    district.value = '';
    loadDistricts(province.value);
};

const handleSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append('avatar', data.avatar);
    loadingEdit.value = true;
    try {
        await UserServices.update(user.value, formData, httpJwt);
        ElMessage({
            message: 'Sửa thành công. Bạn cần đăng nhập lại.',
            type: 'success',
        });
        if (user.value !== null) {
            await authStore.logout(user.value, httpJwt);
            await router.push({ name: 'login' });
        }
    } catch (error) {
        console.error('Failed to submit' + error);
        ElMessage.error('Sửa thất bại.');
    } finally {
        loadingEdit.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            handleSubmit(userInfoForm.value);
        } else {
            return false;
        }
    });
};

onMounted(async () => {
    loadingFullScreen();
    window.addEventListener('resize', handleResize);
    await loadProvinces();
    userInfoForm.value.username = user.value.username;
    userInfoForm.value.email = user.value.email;
    userInfoForm.value.phone = user.value.phone;
    role.value = (await RoleServices.getRoleById(user.value.role)).description;
    if (role.value !== 'Khách hàng') {
        const districtRes = await DistrictServices.getDistrictById(authStore.userInfo?.workPlace);
        const provinceRes = await ProvinceServices.getProvinceById(districtRes.provinceId);
        workPlace.value = `${districtRes.name} - ${provinceRes.name}`;
    }
    if (user.value.address !== '') {
        const districtResponse = await DistrictServices.getDistrictById(user.value.address);
        userInfoForm.value.address = districtResponse.name;
        province.value = (await ProvinceServices.getProvinceById(districtResponse.provinceId)).name;
    }
});
</script>

<style scoped>
.container {
    margin-top: 40px;
}

.avatar-uploader .avatar {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 50%;
    cursor: pointer;
}

h1 {
    text-align: center;
}

.avatar-input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    border-radius: 50%;
    opacity: 0;
}

.address-option {
    display: flex;
    justify-content: space-between;
}

.el-select + .el-select {
    margin-left: 20px;
}

.user-info {
    margin-bottom: 50px;
}

@media only screen and (max-width: 992px) {
    .avatar-uploader {
        margin-left: auto;
        margin-right: auto;
    }

    .avatar-input {
        width: 60%;
    }

    .avatar-uploader .avatar {
        width: 60%;
        height: auto;
    }

    .info-form {
        max-width: 100%;
    }
}
</style>

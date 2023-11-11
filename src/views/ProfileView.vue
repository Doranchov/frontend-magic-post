<template>
    <div class="container">
        <el-row justify="center">
            <el-col :span="24">
                <div class="profile-info">
                    <el-form :model="userInfoForm" label-position="top" class="info-form">
                        <el-row gutter="40" justify="space-around">
                            <el-col :span="8">
                                <el-form-item class="avatar-uploader">
                                    <input
                                        type="file"
                                        class="avatar-input"
                                        ref="avatarInput"
                                        @change="handleChangeAvatar"
                                    />
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                </el-form-item>
                                <h1>Hồ sơ cá nhân</h1></el-col
                            >
                            <el-col :span="12">
                                <el-form-item
                                    label="Họ tên:"
                                    prop="username"
                                    :rules="[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên người dùng',
                                            trigger: 'blur',
                                        },
                                    ]"
                                >
                                    <el-input v-model="username" type="text" />
                                </el-form-item>
                                <el-form-item
                                    label="Email:"
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
                                    <el-input v-model="email" type="email" />
                                </el-form-item>
                                <el-form-item label="Vai trò:" prop="role">
                                    <el-input v-model="role" disabled="true" />
                                </el-form-item>
                                <template v-if="!isCustomer()">
                                    <el-form-item label="Nơi làm việc:">
                                        <el-input v-model="location" disabled="true" />
                                    </el-form-item>
                                </template>
                                <el-form-item label="Số điện thoại:" prop="phone">
                                    <el-input v-model="phone" type="text" />
                                </el-form-item>
                                <el-form-item label="Địa chỉ:" prop="address">
                                    <div class="address-option">
                                        <el-select
                                            placeholder="Chọn tỉnh/thành phố"
                                            v-model="province"
                                            remote
                                            :remote-method="loadProvinces"
                                        >
                                            <el-option
                                                v-for="(item, index) in provinceOptions"
                                                :key="index"
                                                :label="item.name"
                                                :value="item._id"
                                            />
                                        </el-select>
                                        <el-select placeholder="Chọn quận/huyện">
                                            <el-option />
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleSubmit">Lưu lại</el-button>
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
import { ref, onMounted, computed } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import type { Account } from '@/interfaces/index';
import { RoleServices } from '@/services/role/RoleServices';
import useAuthStore from '@/stores/useAuthStore';
import { ProvinceServices } from '@/services/province/ProvinceServices';

const authStore = useAuthStore();

const user = computed(() => authStore.userInfo);

const userInfoForm = ref<Account | null>(null);

const imageUrl: string = user.value.avatar;
const username = ref<string>(user.value.username);
const email = ref<string>(user.value.email);
const phone = ref<string>(user.value.phone);
const address = ref<string>('');
const province = ref<string>('');
const provinceOptions = ref<any[]>([]);
const location = ref<string>('Hà Nội');
const avatar = ref<any | null>();
const avatarInput = ref<HTMLInputElement | null>(null);

const roleArr = [
    'admin',
    'customer',
    'transaction_point_manager',
    'gathering_point_manager',
    'transaction_point_staff',
    'gathering_point_staff',
];
const role = ref<string>('');

const isCustomer = () => {
    if (role.value === 'Khách hàng') {
        return true;
    } else {
        return false;
    }
};

const handleChangeAvatar = () => {
    if (avatarInput.value?.files && avatarInput.value.files[0]) {
        avatar.value = avatarInput.value.files[0];
    }
};

const loadProvinces = async () => {
    const res = await ProvinceServices.getAll();
    console.log(res);
    provinceOptions.value = res;
};

const handleSubmit = async () => {
    // const formData = new FormData();
    // formData.append('username', username.value);
    // formData.append('email', email.value);
    // formData.append('phone', phone.value);
    // formData.append('address', address.value);
    // formData.append('avatar', avatar.value);
    // try {
    //     await UserServices.update(user.value, formData, httpJwt);
    loadingFullScreen();
    // ElMessage({
    //     message: 'Sửa thành công. Bạn cần đăng nhập lại.',
    //     type: 'success',
    // });
    //     if (user.value !== null) {
    //         await authStore.logout(user.value);
    //         await router.push({ name: 'login' });
    //     }
    //     // console.log(formData);
    // } catch (error) {
    //     console.error('Failed to submit' + error);
    //     ElMessage.error('Sửa thất bại.');
    // }
};

onMounted(async () => {
    role.value = (await RoleServices.getRoleById(user.value.role)).description;
    provinceOptions.value = await ProvinceServices.getAll();
    userInfoForm.value = user.value;
});
</script>

<style scoped>
.container {
    margin-top: 40px;
}

.avatar-uploader .avatar {
    width: 360px;
    height: 360px;
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
</style>

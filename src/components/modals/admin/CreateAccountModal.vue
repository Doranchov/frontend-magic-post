<template>
    <el-dialog v-model="visible" title="Tạo tài khoản cho trưởng điểm" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top">
            <el-form-item label="Họ tên:" prop="username">
                <el-input v-model="username" type="text" @change="console.log(username)" />
            </el-form-item>
            <el-form-item label="Email:" prop="email">
                <el-input v-model="email" type="email" @change="console.log(email)" />
            </el-form-item>
            <el-form-item label="Mật khẩu">
                <el-input v-model="password" type="password" />
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
                    <el-select placeholder="Chọn quận/huyện" v-model="district" remote :remote-method="loadDistricts">
                        <el-option
                            v-for="(item, index) in districtOptions"
                            :key="index"
                            :label="item.name"
                            :value="item._id"
                        />
                    </el-select>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Huỷ bỏ</el-button>
                <el-button type="primary" @click="handleCreateAccount"> Tạo mới </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Account } from '@/interfaces/index';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import Role from '@/constants/roles';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { UserAPI } from '@/api/user/UserAPI';
import axios from 'axios';
import { http } from '@/utils/http';

const authStore = useAuthStore();
const user = computed(() => authStore.userInfo);
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const postForm = ref<any>({
    username: '',
    email: '',
});
const roleOptions = [
    {
        label: 'Trưởng điểm tại điểm tập kết',
        value: Role.GATHERING_MANAGER_ROLE,
    },
    {
        label: 'Trưởng điểm tại điểm giao dịch',
        value: Role.TRANSACTION_MANAGER_ROLE,
    },
];
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const role = ref<string>('');
const phone = ref<string>('');
const province = ref<string>('');
const provinceOptions = ref<any[]>([]);
const district = ref<string>('');
const districtOptions = ref<any[]>([]);

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

onMounted(async () => {
    loadProvinces();
});

async function openModal() {
    visible.value = true;
}

defineExpose({
    openModal,
});

const handleCreateAccount = async () => {
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('role', role.value);
    formData.append('phone', phone.value);
    formData.append('workPlace', district.value);
    try {
        const res = await http.post(UserAPI.CREATE_MANAGER, formData, {
            headers: {
                token: `Bearer ${user.value.accessToken}`,
            },
        });
        console.log(res.data.data);
        loadingFullScreen();
        ElMessage({
            message: 'Tạo tài khoản thành công.',
            type: 'success',
        });
        // await router.push({ name: 'home' });
    } catch (error) {
        ElMessage.error('Tạo tài khoản thất bại.');
        console.error('fail to create manager account ' + error);
    }
};
</script>

<style scoped>
.address-option {
    display: flex;
    justify-content: space-between;
}

.el-select + .el-select {
    margin-left: 20px;
}
</style>

<template>
    <el-dialog v-model="visible" title="Chỉnh sửa thông tin tài khoản" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top">
            <el-form-item label="Họ tên" prop="username">
                <el-input v-model="username" type="text" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="email" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone">
                <el-input v-model="phone" type="text" />
            </el-form-item>
            <el-form-item label="Chức vụ" prop="role">
                <el-select v-model="role" class="m-2" placeholder="Các chức vụ">
                    <el-option
                        v-for="(item, index) in roleOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Địa điểm làm việc" prop="workPlace">
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
                <el-button type="primary" :loading="updateLoading" @click="handleUpdate"> Sửa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Account } from '@/interfaces/index';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import Role from '@/constants/roles';
import { RoleServices } from '@/services/role/RoleServices';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    tableData: any[];
}>();
const visible = ref<boolean>(false);
const updateLoading = ref<boolean>(false);
const postForm = ref<Account>();
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
const role = ref<string>('');
const phone = ref<string>('');

const province = ref<string>('');
const provinceOptions = ref<any[]>([]);
const district = ref<string>('');
const districtOptions = ref<any[]>([]);

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const managerId = ref<string>('');

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

const handleUpdate = async () => {
    try {
        updateLoading.value = true;
        visible.value = false;
        const data = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            workPlace: district.value,
            role: role.value,
        };
        const res = await UserServices.updateManagerAccount(authStore.userInfo, data, httpJwt, managerId.value);
        const index = props.tableData.findIndex((item) => item._id === managerId.value);
        const newDistrict = await DistrictServices.getDistrictById(res.workPlace);
        const newProvince = await ProvinceServices.getProvinceById(newDistrict.provinceId);
        if (index !== -1) {
            props.tableData[index] = {
                _id: res._id,
                stt: index + 1,
                username: res.username,
                email: res.email,
                phone: res.phone,
                workPlace: `${newDistrict.name} - ${newProvince.name}`,
                district: newDistrict._id,
                province: newProvince._id,
                role: res.role,
            };
        }

        props.tableData.forEach((item, index) => {
            item.stt = index + 1;
        });
        ElMessage({
            message: 'Cập nhật tài khoản thành công.',
            type: 'success',
        });
    } catch (e) {
        console.error(e);
        ElMessage.error('Cập nhật tài khoản thất bại.');
    } finally {
        updateLoading.value = false;
    }
};

onMounted(async () => {
    loadProvinces();
});

async function openModal(rowData: any) {
    visible.value = true;
    username.value = rowData.username;
    email.value = rowData.email;
    phone.value = rowData.phone;
    province.value = rowData.province;
    district.value = (await DistrictServices.getDistrictById(rowData.district)).name;
    role.value = (await RoleServices.getRoleById(rowData.role)).description;
    managerId.value = rowData._id;
}

defineExpose({
    openModal,
});
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

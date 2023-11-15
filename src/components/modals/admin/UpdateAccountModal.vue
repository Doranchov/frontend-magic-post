<template>
    <el-dialog v-model="visible" title="Chỉnh sửa thông tin tài khoản" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top">
            <el-form-item label="Họ tên">
                <el-input v-model="username" type="text" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="email" type="text" />
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
    } catch (e) {
        console.error(e);
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
    district.value = rowData.district;
    role.value = (await RoleServices.getRoleById(rowData.role)).description;
    console.log(role.value);
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

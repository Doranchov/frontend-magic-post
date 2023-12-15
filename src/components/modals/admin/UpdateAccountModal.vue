<template>
    <el-dialog v-model="visible" title="Chỉnh sửa thông tin tài khoản" width="40%" top="8vh">
        <el-form :model="updateForm" label-position="top" :rules="rules">
            <el-form-item label="Họ tên" prop="username">
                <el-input v-model="updateForm.username" type="text" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="updateForm.email" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone">
                <el-input v-model="updateForm.phone" type="text" />
            </el-form-item>
            <el-form-item label="Chức vụ" prop="role">
                <el-select v-model="updateForm.role" class="m-2" placeholder="Các chức vụ">
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
                    <el-select
                        placeholder="Chọn quận/huyện"
                        v-model="updateForm.workPlace"
                        remote
                        :remote-method="loadDistricts"
                        @change="console.log(updateForm.workPlace)"
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
import { ref, onMounted, reactive } from 'vue';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import Role from '@/constants/roles';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ElMessage, type FormRules } from 'element-plus';

const props = defineProps<{
    callFunction: () => Promise<void>;
}>();
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const updateLoading = ref<boolean>(false);
const updateForm = ref({
    username: '',
    email: '',
    phone: '',
    role: '',
    workPlace: '',
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
    workPlace: [
        {
            required: true,
            message: 'Vui lòng chọn địa chỉ làm việc',
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
    role: [
        {
            required: true,
            message: 'Vui lòng chọn chức vụ',
            trigger: ['blur', 'change'],
        },
    ],
});
const province = ref<string>('');
const provinceOptions = ref<any[]>([]);
const district = ref<string>('');
const districtOptions = ref<any[]>([]);
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
    updateLoading.value = true;
    try {
        const data = {
            username: updateForm.value.username,
            email: updateForm.value.email,
            phone: updateForm.value.phone,
            workPlace: updateForm.value.workPlace,
            role: updateForm.value.role,
        };
        await UserServices.updateManagerAccount(authStore.userInfo, data, httpJwt, managerId.value);
        visible.value = false;
        await props.callFunction();
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
    await loadProvinces();
});

async function openModal(rowData: any) {
    visible.value = true;
    updateForm.value.username = rowData.username;
    updateForm.value.email = rowData.email;
    updateForm.value.phone = rowData.phone;
    province.value = rowData.province;
    updateForm.value.workPlace = (await DistrictServices.getDistrictById(rowData.district)).name;
    updateForm.value.role = rowData.roleId;
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

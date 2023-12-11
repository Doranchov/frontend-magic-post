<template>
    <el-dialog v-model="visible" title="Tạo tài khoản cho trưởng điểm" width="40%" top="8vh">
        <el-form :model="postForm" label-position="top" ref="postFormRef" :rules="rules">
            <el-form-item label="Họ tên:" prop="username">
                <el-input v-model="postForm.username" type="text" />
            </el-form-item>
            <el-form-item label="Email:" prop="email">
                <el-input v-model="postForm.email" type="email" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password">
                <el-input v-model="postForm.password" type="password" :show-password="true" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone">
                <el-input v-model="postForm.phone" type="text" />
            </el-form-item>
            <el-form-item label="Chức vụ" prop="role">
                <el-select v-model="postForm.role" class="m-2" placeholder="Các chức vụ">
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
                        v-model="postForm.workPlace"
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
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Huỷ bỏ</el-button>
                <el-button type="primary" :loading="createLoading" @click="submitForm(postFormRef)">
                    Tạo mới
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import Role from '@/constants/roles';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ElForm, ElMessage, type FormRules } from 'element-plus';

const props = defineProps<{
    callFunction: () => Promise<void>;
}>();
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const postForm = ref({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    workPlace: '',
});

const postFormRef = ref<typeof ElForm | null>(null);
const visible = ref<boolean>(false);
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
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
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
const createLoading = ref<boolean>(false);

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

const resetForm = (form: any) => {
    form.username = '';
    form.email = '';
    form.password = '';
    form.phone = '';
    form.role = '';
    form.workPlace = '';
};

const handleCreateAccount = async (data: any) => {
    createLoading.value = true;
    try {
        const res = await UserServices.createManagerAccount(authStore.userInfo, data, httpJwt);
        visible.value = false;
        await props.callFunction();
        ElMessage({
            message: 'Tạo tài khoản thành công.',
            type: 'success',
        });
    } catch (error) {
        ElMessage.error('Tạo tài khoản thất bại.');
        console.error('fail to create manager account ' + error);
    } finally {
        createLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            handleCreateAccount(postForm.value);
        } else {
            return false;
        }
    });
};

onMounted(async () => {
    await loadProvinces();
});

function openModal() {
    visible.value = true;
    resetForm(postForm.value);
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

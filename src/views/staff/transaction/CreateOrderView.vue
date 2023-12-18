<template>
    <el-row justify="space-evenly">
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <UserIcon />
                    </span>
                    <span>Người gửi</span>
                </div>
                <div class="box-content">
                    <el-form
                        label-position="left"
                        :model="postForm"
                        ref="senderFormRef"
                        label-width="150px"
                        :rules="senderRules"
                    >
                        <el-form-item label="Điện thoại" prop="senderPhone">
                            <el-input
                                v-model="postForm.senderPhone"
                                autocomplete="off"
                                type="text"
                                @change="handleChangeSenderPhone"
                            />
                        </el-form-item>

                        <el-form-item label="Họ tên người gửi" prop="senderUsername">
                            <el-input v-model="postForm.senderUsername" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Nơi gửi" prop="senderAddress">
                            <el-cascader
                                class="comin_place"
                                placeholder="Nơi gửi hàng"
                                :options="senderOptions"
                                filterable
                                @change="handleChangeSender"
                                v-model="postForm.senderAddress"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <UserIcon />
                    </span>
                    <span>Người nhận</span>
                </div>
                <div class="box-content">
                    <el-form
                        label-position="left"
                        label-width="150px"
                        ref="receiverFormRef"
                        :model="postForm"
                        :rules="receiverRules"
                    >
                        <el-form-item label="Điện thoại" prop="receiverPhone">
                            <el-input
                                v-model="postForm.receiverPhone"
                                autocomplete="off"
                                type="text"
                                @change="handleChangeReceiverPhone"
                            />
                        </el-form-item>

                        <el-form-item label="Họ tên người nhận" prop="receiverUsername">
                            <el-input v-model="postForm.receiverUsername" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Nơi nhận" prop="receiverAddress">
                            <el-cascader
                                class="comin_place"
                                placeholder="Nơi nhận hàng"
                                :options="receiverOptions"
                                filterable
                                v-model="postForm.receiverAddress"
                                @change="handleChangeReceiver"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row justify="space-evenly" align="bottom">
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <BoxIcon />
                    </span>
                    <span>Thông tin hàng hóa</span>
                </div>
                <div class="box-content">
                    <el-form
                        label-position="left"
                        label-width="150px"
                        ref="packageFormRef"
                        :model="postForm"
                        :rules="packageRules"
                    >
                        <el-form-item label="Tên hàng hóa" prop="namePackage">
                            <el-input v-model="postForm.namePackage" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Trọng lượng" prop="weightPackage">
                            <el-input
                                v-model="postForm.weightPackage"
                                autocomplete="off"
                                type="number"
                                step="0.1"
                                class="kg-input"
                                placeholder="Tính theo kilogram (kg)"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <VanIcon />
                    </span>
                    <span>Thông tin vận chuyển</span>
                </div>
                <div class="box-content">
                    <el-form
                        label-position="left"
                        label-width="150px"
                        ref="transferFormRef"
                        :model="postForm"
                        :rules="transferRules"
                    >
                        <el-form-item label="Phí vận chuyển" prop="shippingFee">
                            <el-input
                                v-model="postForm.shippingFee"
                                autocomplete="off"
                                type="number"
                                step="1000"
                                placeholder="Tính theo Việt Nam Đồng (vnd)"
                            />
                        </el-form-item>

                        <el-form-item label="Phương thức vận chuyển" prop="shippingMethod">
                            <el-select
                                v-model="postForm.shippingMethod"
                                placeholder="Phương thức vận chuyển"
                                @change="handleChangeMethod"
                            >
                                <el-option v-for="item in methods" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>

    <div class="btn-create">
        <div style="float: right">
            <el-button :loading="createLoading" type="primary" size="large" @click="submitForm(postFormRefs)"
                >Tạo đơn hàng</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import useDistrictStore from '@/stores/useDistrictStore';
import useProvinceStore from '@/stores/useProvinceStore';
import { ElForm, ElMessage, type FormRules } from 'element-plus';
import { TransactionStaffServices } from '@/services/user/TransactionStaffServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { UserServices } from '@/services/user/UserServices';
import UserIcon from '@/components/icons/UserIcon.vue';
import BoxIcon from '@/components/icons/BoxIcon.vue';
import VanIcon from '@/components/icons/VanIcon.vue';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';

interface AddressOption {
    label: string;
    value: string;
    children: any[];
}
const createLoading = ref<boolean>(false);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);

const senderFormRef = ref<typeof ElForm | null>(null);
const receiverFormRef = ref<typeof ElForm | null>(null);
const packageFormRef = ref<typeof ElForm | null>(null);
const transferFormRef = ref<typeof ElForm | null>(null);
const postFormRefs = ref([senderFormRef, receiverFormRef, packageFormRef, transferFormRef]);
const senderRules = reactive<FormRules<any>>({
    senderPhone: [
        {
            required: true,
            message: 'Vui lòng nhập số điện thoại người gửi',
            trigger: 'blur',
        },
    ],
    senderUsername: [
        {
            required: true,
            message: 'Vui lòng nhập tên người gửi',
            trigger: 'blur',
        },
    ],
    senderAddress: [
        {
            required: true,
            message: 'Vui lòng chọn nơi gửi',
            trigger: ['blur', 'change'],
        },
    ],
});
const receiverRules = reactive<FormRules<any>>({
    receiverPhone: [
        {
            required: true,
            message: 'Vui lòng nhập số điện thoại người nhận',
            trigger: 'blur',
        },
    ],
    receiverUsername: [
        {
            required: true,
            message: 'Vui lòng nhập tên người nhận',
            trigger: 'blur',
        },
    ],
    receiverAddress: [
        {
            required: true,
            message: 'Vui lòng chọn nơi nhận',
            trigger: ['blur', 'change'],
        },
    ],
});
const packageRules = reactive<FormRules<any>>({
    namePackage: [
        {
            required: true,
            message: 'Vui lòng nhập tên hàng hóa',
            trigger: 'blur',
        },
    ],
    weightPackage: [
        {
            required: true,
            message: 'Vui lòng nhập cân nặng hàng',
            trigger: 'blur',
        },
    ],
});
const transferRules = reactive<FormRules<any>>({
    shippingFee: [
        {
            required: true,
            message: 'Vui lòng nhập phí vận chuyển',
            trigger: 'blur',
        },
    ],
    shippingMethod: [
        {
            required: true,
            message: 'Vui lòng chọn phương thức vận chuyển',
            trigger: ['blur', 'change'],
        },
    ],
});
const methods = [
    {
        label: 'Vận chuyển nhanh',
        value: 'fast',
    },
    {
        label: 'Vận chuyển tiêu chuẩn',
        value: 'express',
    },
];

const senderId = ref<string>('');
const senderUsername = ref<string>('');
const receiverId = ref<string>('');
const receiverUsername = ref<string>('');
const provinceStore = useProvinceStore();
const districtStore = useDistrictStore();
const receiverOptions = ref<AddressOption[]>([]);
const senderOptions = ref<AddressOption[]>([]);

const postForm = ref({
    senderPhone: '',
    senderUsername: '',
    senderAddress: '',
    receiverPhone: '',
    receiverUsername: '',
    receiverAddress: '',
    namePackage: '',
    weightPackage: '',
    shippingFee: '',
    shippingMethod: '',
});

const handleChangeSender = (value: any) => {
    postForm.value.senderAddress = value[1];
};

const handleChangeReceiver = (value: any) => {
    postForm.value.receiverAddress = value[1];
};

const handleChangeMethod = () => {
    console.log(postForm.value.shippingMethod);
};

const loadPhone = async (id: any, username: any, phone: any) => {
    try {
        const res = await UserServices.getUserByPhoneNumber(authStore.userInfo, phone, httpJwt);
        id.value = res._id;
        username.value = res.username;
    } catch (e) {
        console.log(e);
        ElMessage.error('Không tìm thấy số điện thoại này. Vui lòng nhập lại.');
    }
};

const handleChangeSenderPhone = async () => {
    await loadPhone(senderId, senderUsername, postForm.value.senderPhone);
    postForm.value.senderUsername = senderUsername.value;
};

const handleChangeReceiverPhone = async () => {
    await loadPhone(receiverId, receiverUsername, postForm.value.receiverPhone);
    postForm.value.receiverUsername = receiverUsername.value;
};

const resetForm = (form: any) => {
    form.senderPhone = '';
    form.senderUsername = '';
    form.senderAddress = '';
    form.receiverPhone = '';
    form.receiverUsername = '';
    form.receiverAddress = '';
    form.namePackage = '';
    form.weightPackage = '';
    form.shippingFee = '';
    form.shippingMethod = '';
};

const handleCreatePackage = async (data: any) => {
    createLoading.value = true;
    try {
        const postData = {
            creatorId: authStore.userInfo._id,
            senderId: senderId.value,
            receiverId: receiverId.value,
            name: data.namePackage,
            weight: data.weightPackage,
            transactionSendingAddress: data.senderAddress,
            transactionDeliveryAddress: data.receiverAddress,
            shippingFee: data.shippingFee,
            shippingMethod: data.shippingMethod,
            currentPoint: data.senderAddress,
        };
        await TransactionStaffServices.createPackageToReceiver(authStore.userInfo, postData, httpJwt);
        resetForm(data);
        ElMessage({
            type: 'success',
            message: 'Tạo gói hàng thành công.',
        });
    } catch (err) {
        console.log(err);
        ElMessage.error('Tạo gói hàng thất bại.');
    } finally {
        createLoading.value = false;
    }
};
const submitForm = (formEl: any[]) => {
    let isValid = true;
    for (const formRef of formEl) {
        if (!formRef) return;
        formRef.value.validate((valid: any) => {
            if (!valid) {
                isValid = false;
            }
        });
    }
    if (isValid) {
        handleCreatePackage(postForm.value);
    } else {
        return false;
    }
};

onBeforeMount(async () => {
    await provinceStore.getAllProvinces();
    await districtStore.getAllDistricts();
    const districtSender = await DistrictServices.getDistrictById(authStore.userInfo.workPlace);
    const provinceWorkPlace = await ProvinceServices.getProvinceById(districtSender.provinceId);
    for (const province of provinceStore.provinces) {
        const children: any[] = [];
        for (const district of districtStore.districts) {
            if (district.provinceId === province._id) {
                children.push({
                    value: district._id,
                    label: district.name,
                });
            }
        }
        receiverOptions.value.push({
            label: province.name,
            value: province._id,
            children: children,
        });
    }
    senderOptions.value.push({
        label: provinceWorkPlace.name,
        value: provinceWorkPlace._id,
        children: [
            {
                value: districtSender._id,
                label: districtSender.name,
            },
        ],
    });
});

onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.box-container {
    border: 1px solid #b1b3b8;
    border-radius: 8px;
}
.box-header {
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #b1b3b8;
    border-radius: 6px 6px 0 0;
}

.icon-user {
    width: 20px;
    margin-left: 8px;
    margin-right: 6px;
}

.box-content {
    padding: 16px;
}

.el-row + .el-row {
    margin-top: 20px;
}

.btn-create {
    width: 86.5%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 20px auto;
}
</style>

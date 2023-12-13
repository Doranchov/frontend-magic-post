<template>
    <el-card class="card">
        <template #header>
            <div class="header">
                <span>Mã hàng hóa: {{ props.data.code }}</span>
                <span class="bold"
                    ><el-button class="no-hover" plain :type="type">{{ status }}</el-button>
                </span>
            </div>
        </template>
        <el-row>
            <el-col :span="8">
                <el-form label-position="left" label-width="110px">
                    <el-form-item label="SĐT người gửi:">
                        <div class="bold">{{ phone }}</div>
                    </el-form-item>
                    <el-form-item label="Ngày gửi:">
                        <div class="bold">{{ convertDateTime(props.data.createdAt) }}</div>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form label-position="left" label-width="110px">
                    <el-form-item label="Tên hàng:">
                        <div class="bold">{{ props.data.name }}</div>
                    </el-form-item>
                    <el-form-item label="Trọng lượng:">
                        <div class="bold">{{ props.data.weight }}kg</div>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="Tiền phí:">
                        <div class="bold">{{ props.data.shippingFee }}đ</div>
                    </el-form-item>
                    <el-form-item label="Dịch vụ:">
                        <div class="bold">{{ shippingMethod }}</div>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
import { convertDateTime } from '@/helpers/convertDateTime';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { computed, onMounted, ref } from 'vue';
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const phone = ref('');
const type = ref('warning');
const shippingMethod = computed(() => {
    if (props.data.shippingMethod === 'express') {
        return 'Vận chuyển tiêu chuẩn';
    } else {
        return 'Vận chuyển nhanh';
    }
});
const status = computed(() => {
    if (props.data.status === 'shipping') {
        type.value = 'warning';
        return 'Đang vận chuyển';
    } else if (props.data.status === 'success') {
        type.value = 'success';
        return 'Giao thành công';
    } else if (props.data.status === 'fail') {
        type.value = 'danger';
        return 'Giao thất bại';
    }
});
const props = withDefaults(
    defineProps<{
        data?: any;
    }>(),
    {
        data: {},
    },
);

onMounted(async () => {
    const res = await UserServices.getUserById(authStore.userInfo, props.data.senderId, httpJwt);
    console.log(res);
    phone.value = res.phone;
});
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
.header {
    display: flex;
    justify-content: space-between;
}

.bold {
    font-weight: 600;
}

.no-hover {
    pointer-events: none;
}
</style>

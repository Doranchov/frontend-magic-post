<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>

    <template v-if="control === 'send'">
        <el-table :data="dataTableSend" v-loading="loadingTable" :default-sort="{ prop: 'stt', order: 'ascending' }">
            <el-table-column prop="stt" label="STT" width="80" sortable></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" sortable></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90"></el-table-column>
            <el-table-column prop="sender" label="Người gửi"></el-table-column>
            <el-table-column prop="receiver" label="Người nhận"></el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi"></el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận"></el-table-column>
            <el-table-column prop="shippingFee" label="Phí vận chuyển" width="150" sortable></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="200"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
            <el-table-column fixed="right" label="Hành động" width="100">
                <template #default="scope">
                    <div>
                        <el-button
                            type="warning"
                            size="small"
                            plain
                            :loading="loadingSend"
                            :disabled="scope.row.currentPoint !== scope.row.transactionSendingAddress"
                            @click="handleSendPackageToGathering(scope.row)"
                            >Gửi</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataSend"
                @current-change="handleChangePageSend"
            />
        </div>
    </template>

    <template v-if="control === 'receive'">
        <el-table :data="dataTableReceive" v-loading="loadingTable" :default-sort="{ prop: 'stt', order: 'ascending' }">
            <el-table-column prop="stt" label="STT" width="80" sortable></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" sortable></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90"></el-table-column>
            <el-table-column prop="sender" label="Người gửi"></el-table-column>
            <el-table-column prop="receiver" label="Người nhận"></el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi"></el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận"></el-table-column>
            <el-table-column prop="shippingFee" label="Phí vận chuyển" width="150" sortable></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="200"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
            <el-table-column fixed="right" label="Xác nhận" width="100">
                <template #default="scope">
                    <div>
                        <el-button
                            type="warning"
                            size="small"
                            plain
                            :disabled="scope.row.currentPoint !== scope.row.nextPoint"
                            @click="handleConfirmPackage(scope.row)"
                            >Xác nhận</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataDelivery"
                @current-change="handleChangePageDelivery"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { PackageServices } from '@/services/package/PackageServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { TransactionStaffServices } from '@/services/user/TransactionStaffServices';
import { ElMessage } from 'element-plus';

const control = ref<string>('receive');
const loadingTable = ref<boolean>(false);
const loadingSend = ref<boolean>(false);
const loadingConfirm = ref<boolean>(false);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);

const currentPageSend = ref<number>(1);
const totalDataSend = ref<number>(0);
const dataTableSend = ref<any[]>([]);
const handleChangePageSend = async (val: number) => {
    await getPackageToSend(val);
};

const currentPageDelivery = ref<number>(1);
const totalDataDelivery = ref<number>(0);
const dataTableReceive = ref<any[]>([]);
const handleChangePageDelivery = async (val: number) => {
    await getReceivedPackage(val);
};

const getReceivedPackage = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableReceive.value = [];
        const res = await PackageServices.getPackageDelivery(authStore.userInfo, page, httpJwt);
        totalDataDelivery.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableReceive.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                weight: `${item.weight}kg`,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
                gatheringSendingAddress: item.gatheringSendingAddress,
                gatheringDeliveryAddress: item.gatheringDeliveryAddress,
                transactionDeliveryAddress: item.transactionDeliveryAddress,
                currentPoint: item.currentPoint,
                nextPoint: item.nextPoint,
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        loadingTable.value = false;
    }
};

const getPackageToSend = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableSend.value = [];
        const res = await PackageServices.getPackageToSend(authStore.userInfo, page, httpJwt);
        totalDataSend.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableSend.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                weight: `${item.weight}kg`,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
                gatheringSendingAddress: item.gatheringSendingAddress,
                gatheringDeliveryAddress: item.gatheringDeliveryAddress,
                transactionDeliveryAddress: item.transactionDeliveryAddress,
                currentPoint: item.currentPoint,
                nextPoint: item.nextPoint,
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        loadingTable.value = false;
    }
};

const handleConfirmPackage = async (row: any) => {
    loadingConfirm.value = true;
    try {
        await TransactionStaffServices.confirmPackageFromGathering(authStore.userInfo, row._id, httpJwt);
        await getReceivedPackage(1);
        ElMessage({
            type: 'success',
            message: 'Xác nhận hàng thành công.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Xác nhận hàng thất bại.');
    } finally {
        loadingConfirm.value = false;
    }
};

const handleSendPackageToGathering = async (row: any) => {
    loadingSend.value = true;
    try {
        await TransactionStaffServices.sendPackageToGathering(authStore.userInfo, row._id, httpJwt);
        await getPackageToSend(1);
        ElMessage({
            type: 'success',
            message: 'Gửi hàng đến điểm tập kết thành công.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Gửi hàng thất bại.');
    } finally {
        loadingSend.value = false;
    }
};

const handleChangeRadio = async () => {
    if (control.value === 'send') {
        await getPackageToSend(1);
    } else if (control.value === 'receive') {
        await getReceivedPackage(1);
    }
};

onMounted(async () => {
    loadingFullScreen();
    await getReceivedPackage(1);
});
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
}

.pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 70px;
}
</style>

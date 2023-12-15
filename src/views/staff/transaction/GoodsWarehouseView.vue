<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="shipping"> Đang xử lý</el-radio-button>
            <el-radio-button label="success"> Thành công </el-radio-button>
            <el-radio-button label="fail"> Thất bại </el-radio-button>
        </el-radio-group>
    </div>

    <template v-if="control === 'shipping'">
        <el-table
            :data="dataTableShipping"
            v-loading="loadingTable"
            :border="true"
            :default-sort="{ prop: 'stt', order: 'ascending' }"
        >
            <el-table-column prop="stt" label="STT" width="80" sortable :align="'center'"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" width="140" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.name">
                        <template #reference
                            ><el-text truncated> {{ row.name }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã hàng hóa" width="110"></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90" :align="'center'"></el-table-column>
            <el-table-column prop="sender" label="Người gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sender">
                        <template #reference
                            ><el-text truncated> {{ row.sender }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="receiver" label="Người nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.receiver">
                        <template #reference
                            ><el-text truncated> {{ row.receiver }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sendingAddress">
                        <template #reference
                            ><el-text truncated> {{ row.sendingAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.deliveryAddress">
                        <template #reference
                            ><el-text truncated> {{ row.deliveryAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="shippingFee"
                label="Phí gửi"
                width="100"
                sortable
                :align="'center'"
            ></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="180"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
            <el-table-column fixed="right" label="Hành động" width="120" :align="'center'">
                <template #default="scope">
                    <div>
                        <el-tooltip effect="dark" content="Xác nhận đến người nhận thành công." placement="bottom">
                            <el-button
                                type="success"
                                size="small"
                                plain
                                :loading="loadingSuccess"
                                @click="handleSuccess(scope.row)"
                                >TC</el-button
                            >
                        </el-tooltip>
                        <el-tooltip effect="dark" content="Xác nhận đến người nhận thất bại." placement="bottom">
                            <el-button
                                type="danger"
                                size="small"
                                plain
                                :loading="loadingFail"
                                @click="handleFail(scope.row)"
                                >TB</el-button
                            >
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataShipping"
                @current-change="handleChangePageShipping"
            />
        </div>
    </template>

    <template v-if="control === 'success'">
        <el-table
            :data="dataTableSuccess"
            :border="true"
            v-loading="loadingTable"
            :default-sort="{ prop: 'stt', order: 'ascending' }"
        >
            <el-table-column prop="stt" label="STT" width="80" sortable :align="'center'"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" width="140" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.name">
                        <template #reference
                            ><el-text truncated> {{ row.name }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã hàng hóa" width="110"></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90" :align="'center'"></el-table-column>
            <el-table-column prop="sender" label="Người gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sender">
                        <template #reference
                            ><el-text truncated> {{ row.sender }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="receiver" label="Người nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.receiver">
                        <template #reference
                            ><el-text truncated> {{ row.receiver }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sendingAddress">
                        <template #reference
                            ><el-text truncated> {{ row.sendingAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.deliveryAddress">
                        <template #reference
                            ><el-text truncated> {{ row.deliveryAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="shippingFee"
                label="Phí gửi"
                width="100"
                sortable
                :align="'center'"
            ></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="180"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataSuccess"
                @current-change="handleChangePageSuccess"
            />
        </div>
    </template>

    <template v-if="control === 'fail'">
        <el-table
            :data="dataTableFail"
            :border="true"
            v-loading="loadingTable"
            :default-sort="{ prop: 'stt', order: 'ascending' }"
        >
            <el-table-column prop="stt" label="STT" width="80" sortable :align="'center'"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" width="140" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.name">
                        <template #reference
                            ><el-text truncated> {{ row.name }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã hàng hóa" width="110"></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90" :align="'center'"></el-table-column>
            <el-table-column prop="sender" label="Người gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sender">
                        <template #reference
                            ><el-text truncated> {{ row.sender }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="receiver" label="Người nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.receiver">
                        <template #reference
                            ><el-text truncated> {{ row.receiver }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sendingAddress">
                        <template #reference
                            ><el-text truncated> {{ row.sendingAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.deliveryAddress">
                        <template #reference
                            ><el-text truncated> {{ row.deliveryAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="shippingFee"
                label="Phí gửi"
                width="100"
                sortable
                :align="'center'"
            ></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="180"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataFail"
                @current-change="handleChangePageFail"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ref, onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { PackageServices } from '@/services/package/PackageServices';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { ElMessage } from 'element-plus';
import { TransactionStaffServices } from '@/services/user/TransactionStaffServices';

const control = ref<string>('shipping');
const loadingTable = ref<boolean>(false);
const loadingSuccess = ref<boolean>(false);
const loadingFail = ref<boolean>(false);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);

// shipping
const dataTableShipping = ref<any[]>([]);
const totalDataShipping = ref<number>(0);
const handleChangePageShipping = async (val: number) => {
    await getPackageShipping(val);
};
const getPackageShipping = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableShipping.value = [];
        const res = await PackageServices.getPackageShipping(authStore.userInfo, page, httpJwt);
        totalDataShipping.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableShipping.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                code: item.code,
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

const handleSuccess = async (row: any) => {
    loadingSuccess.value = true;
    try {
        await TransactionStaffServices.confirmToReceiverSuccess(authStore.userInfo, row._id, httpJwt);
        await getPackageShipping(1);
        ElMessage({
            type: 'success',
            message: 'Xử lý hành động thành công. Chuyển đến kho để xem thêm.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Xử lý hành động thất bại.');
    } finally {
        loadingSuccess.value = false;
    }
};

const handleFail = async (row: any) => {
    loadingFail.value = true;
    try {
        await TransactionStaffServices.confirmToReceiverFail(authStore.userInfo, row._id, httpJwt);
        await getPackageShipping(1);
        ElMessage({
            type: 'success',
            message: 'Xử lý hành động thành công. Chuyển đến kho để xem thêm.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Xử lý hành động thất bại.');
    } finally {
        loadingFail.value = false;
    }
};

// success
const dataTableSuccess = ref<any[]>([]);
const totalDataSuccess = ref<number>(0);
const handleChangePageSuccess = async (val: number) => {
    await getPackageSuccess(val);
};
const getPackageSuccess = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableSuccess.value = [];
        const res = await PackageServices.getPackageSuccess(authStore.userInfo, page, httpJwt);
        totalDataSuccess.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableSuccess.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                code: item.code,
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

// fail
const dataTableFail = ref<any[]>([]);
const totalDataFail = ref<number>(0);
const handleChangePageFail = async (val: number) => {
    await getPackageFail(val)
};
const getPackageFail = async (page: number) => {
    loadingTable.value = true;
    try {
        dataTableFail.value = [];
        const res = await PackageServices.getPackageFail(authStore.userInfo, page, httpJwt);
        totalDataFail.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableFail.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                code: item.code,
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

const handleChangeRadio = async () => {
    if (control.value === 'shipping') {
        await getPackageShipping(1);
    } else if (control.value === 'success') {
        await getPackageSuccess(1);
    } else if (control.value === 'fail') {
        await getPackageFail(1);
    }
};

onMounted(async () => {
    loadingFullScreen();
    await getPackageShipping(1);
});
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.pagination {
    float: right;
}
</style>

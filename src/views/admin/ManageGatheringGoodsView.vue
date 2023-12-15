<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>

    <template v-if="control === 'send'">
        <el-select v-model="valueSend" class="m-2" placeholder="Chọn nơi tập kết" @change="handleChangeValueSend">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-table
            :data="dataTableSend"
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
            <el-table-column prop="creator" label="Người tạo" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.creator">
                        <template #reference
                            ><el-text truncated> {{ row.creator }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
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
            <el-table-column prop="deliveryAddress" label="Nơi nhận" sortable>
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
            <el-table-column prop="status" label="Trạng thái" width="120" sortable :align="'center'"></el-table-column>
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
        <el-select v-model="valueReceive" class="m-2" placeholder="Chọn nơi tập kết" @change="handleChangeValueReceive">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-table
            :data="dataTableReceive"
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
            <el-table-column prop="creator" label="Người tạo" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.creator">
                        <template #reference
                            ><el-text truncated> {{ row.creator }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
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
            <el-table-column prop="deliveryAddress" label="Nơi nhận" sortable>
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
            <el-table-column prop="status" label="Trạng thái" width="120" sortable :align="'center'"></el-table-column>
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
import { ref, onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { PackageServices } from '@/services/package/PackageServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { PointServices } from '@/services/point/PointServices';

const control = ref<string>('receive');
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const totalDataDelivery = ref<number>(0);
const totalDataSend = ref<number>(0);
const loadingTable = ref<boolean>(false);
const valueSend = ref<string>('');
const valueReceive = ref<string>('');
const currentSendGathering = ref<string>('');
const currentDeliveryGathering = ref<string>('');

const options = ref<any[]>([]);
const dataTableSend = ref<any[]>([]);
const dataTableReceive = ref<any[]>([]);

const handleChangeRadio = () => {
    // console.log(control.value);
};

const handleChangeValueSend = async (value: any) => {
    currentSendGathering.value = value;
    await getPackageToSend(1, value);
};

const handleChangePageSend = async (val: any) => {
    await getPackageToSend(val, currentSendGathering);
};

const getPackageToSend = async (page: any, location: any) => {
    loadingTable.value = true;
    try {
        dataTableSend.value = [];
        const res = await PackageServices.getPackageSendGatheringAdmin(authStore.userInfo, page, location, httpJwt);
        totalDataSend.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const creator = await UserServices.getUserById(authStore.userInfo, item.creatorId, httpJwt);
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
                code: item.code,
                weight: `${item.weight}kg`,
                creator: creator.username,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
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

// receive table
const handleChangeValueReceive = async (value: any) => {
    currentDeliveryGathering.value = value;
    await getReceivedPackage(1, value);
};

const handleChangePageDelivery = async (val: number) => {
    await getReceivedPackage(val, currentDeliveryGathering.value);
};

const getReceivedPackage = async (page: any, location: any) => {
    loadingTable.value = true;
    try {
        dataTableReceive.value = [];
        const res = await PackageServices.getPackageDeliveryGatheringAdmin(authStore.userInfo, page, location, httpJwt);
        totalDataDelivery.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const creator = await UserServices.getUserById(authStore.userInfo, item.creatorId, httpJwt);
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
                code: item.code,
                weight: `${item.weight}kg`,
                creator: creator.username,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
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

onMounted(async () => {
    loadingFullScreen();
    const res = await PointServices.getGatheringPoint();
    res.map(async (point: any) => {
        const province = await ProvinceServices.getProvinceById(point.province);
        options.value.push({
            label: ` ${province.name}`,
            value: point.location,
        });
    });
});
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
}

.control-group-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.m-2 {
    margin-bottom: 20px;
}

.pagination {
    float: right;
}
</style>

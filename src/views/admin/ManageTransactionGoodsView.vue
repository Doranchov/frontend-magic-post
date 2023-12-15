<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>

    <template v-if="control === 'send'">
        <el-cascader
            class="m-2"
            placeholder="Chọn nơi giao dịch"
            :options="options"
            filterable
            @change="handleChangeValueSend"
            :style="styles"
        />
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
        <el-cascader
            class="m-2"
            placeholder="Chọn nơi giao dịch"
            :options="options"
            filterable
            @change="handleChangeValueReceive"
            :style="styles"
        />
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
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { PackageServices } from '@/services/package/PackageServices';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import useProvinceStore from '@/stores/useProvinceStore';
import useDistrictStore from '@/stores/useDistrictStore';

const control = ref<string>('receive');
const authStore = useAuthStore();
const provinceStore = useProvinceStore();
const districtStore = useDistrictStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const totalDataDelivery = ref<number>(0);
const totalDataSend = ref<number>(0);
const loadingTable = ref<boolean>(false);
const currentSendGathering = ref<string>('');
const currentDeliveryGathering = ref<string>('');
const styles = ref({
    marginBottom: '20px',
});

const options = ref<any[]>([]);
const dataTableSend = ref<any[]>([]);
const dataTableReceive = ref<any[]>([]);

const handleChangeRadio = () => {
    // console.log(control.value);
};

// send table
const handleChangeValueSend = async (value: any) => {
    currentSendGathering.value = value[1];
    await getPackageToSend(1, value[1]);
};

const handleChangePageSend = async (val: any) => {
    await getPackageToSend(val, currentSendGathering);
};

const getPackageToSend = async (page: any, location: any) => {
    loadingTable.value = true;
    try {
        dataTableSend.value = [];
        const res = await PackageServices.getPackageSendTransactionAdmin(authStore.userInfo, page, location, httpJwt);
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
    currentDeliveryGathering.value = value[1];
    await getReceivedPackage(1, value[1]);
};

const handleChangePageDelivery = async (val: number) => {
    await getReceivedPackage(val, currentDeliveryGathering.value);
};

const getReceivedPackage = async (page: any, location: any) => {
    loadingTable.value = true;
    try {
        dataTableReceive.value = [];
        const res = await PackageServices.getPackageDeliveryTransactionAdmin(
            authStore.userInfo,
            page,
            location,
            httpJwt,
        );
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
    await provinceStore.getAllProvinces();
    await districtStore.getAllDistricts();
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
        options.value.push({
            label: province.name,
            value: province._id,
            children: children,
        });
    }
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

.pagination {
    float: right;
}
</style>

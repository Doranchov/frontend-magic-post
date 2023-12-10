<template>
    <div class="title-page">
        <h1>Tài Khoản Nhân Viên Giao Dịch</h1>
    </div>
    <el-table
        :data="tableData"
        v-loading="tableLoading"
        class="table"
        :default-sort="{ prop: 'stt', order: 'ascending' }"
    >
        <el-table-column label="STT" prop="stt" width="80" sortable></el-table-column>
        <el-table-column label="Họ tên" prop="username" sortable></el-table-column>
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="Chức vụ" prop="role"></el-table-column>
        <el-table-column label="Số điện thoại" prop="phone"></el-table-column>
        <el-table-column label="Nơi làm việc" prop="workPlace"></el-table-column>
        <el-table-column label="Ngày tạo" prop="createdAt" sortable></el-table-column>
        <el-table-column fixed="right" label="Hành động" width="130">
            <template v-slot="scope" #default>
                <el-button type="primary" size="small" plain @click="updateAccountRef?.openModal(scope.row)"
                    >Sửa</el-button
                >
                <el-button type="danger" size="small" @click="visible = true" plain>Xóa</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="Xóa tài khoản" width="30%">
        <span> Bạn có muốn xóa tài khoản này không ? </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Hủy</el-button>
                <el-button type="danger" @click="visible = false"> Xóa </el-button>
            </span>
        </template>
    </el-dialog>

    <div class="pagination">
        <el-pagination
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="totalData"
            @current-change="handleChangePage"
        />
    </div>

    <div class="btn-add">
        <el-button type="primary" circle size="large" class="btn" @click="createAccountRef?.openModal()">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" class="icon">
                <path
                    fill="currentColor"
                    d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                ></path>
            </svg>
        </el-button>
    </div>

    <CreateAccountModal ref="createAccountRef" :call-function="() => loadTableData(1)" />
    <UpdateAccountModal ref="updateAccountRef" :call-function="() => loadTableData(1)" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CreateAccountModal from '@/components/modals/manager/CreateAccountModal.vue';
import UpdateAccountModal from '@/components/modals/manager/UpdateAccountModal.vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { ManagerServices } from '@/services/user/ManagerServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { checkRole } from '@/helpers/checkRole';
import { convertDateTime } from '@/helpers/convertDateTime';

const authStore = useAuthStore();
const httJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const tableData = ref<any[]>([]);
const tableLoading = ref<boolean>(false);
const totalData = ref<number>(0);

const createAccountRef = ref<InstanceType<typeof CreateAccountModal>>();
const updateAccountRef = ref<InstanceType<typeof UpdateAccountModal>>();

const loadTableData = async (page: any) => {
    tableLoading.value = true;
    try {
        tableData.value = [];
        const res = await ManagerServices.getTransactionStaff(authStore.userInfo, page, httJwt);
        totalData.value = res.total;
        res.data.map(async (account: any, index: number) => {
            const district = await DistrictServices.getDistrictById(account.workPlace);
            const province = await ProvinceServices.getProvinceById(district.provinceId);
            tableData.value.push({
                _id: account._id,
                stt: index + 1,
                username: account.username,
                email: account.email,
                role: checkRole(account.role),
                phone: account.phone,
                workPlace: `${district.name} - ${province.name}`,
                district: district._id,
                province: province._id,
                createdAt: convertDateTime(account.createdAt),
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        tableLoading.value = false;
    }
};

const handleChangePage = async (val: number) => {
    await loadTableData(val);
};

onMounted(async () => {
    loadingFullScreen();
    await loadTableData(1);
});
</script>

<style scoped>
.title-page {
    text-align: center;
    margin-bottom: 28px;
}
.icon {
    width: 25px;
}

.table {
}

.btn-add {
    width: 90%;
    position: fixed;
    bottom: 80px;
    left: 0px;
    right: 0px;
    margin: 0px auto;
}

.btn {
    float: right;
}

.pagination {
    float: right;
}
</style>
@/helpers/checkRole

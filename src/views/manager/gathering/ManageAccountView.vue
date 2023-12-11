<template>
    <div class="title-page">
        <h1>Tài Khoản Nhân Viên Tập Kết</h1>
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
        <el-table-column label="Chức vụ" prop="role" width="250"></el-table-column>
        <el-table-column label="Số điện thoại" prop="phone"></el-table-column>
        <el-table-column label="Nơi làm việc" prop="workPlace" width="300"></el-table-column>
        <el-table-column label="Ngày tạo" prop="createdAt" sortable></el-table-column>
        <el-table-column fixed="right" label="Hành động" width="130">
            <template v-slot="scope" #default>
                <el-button type="primary" size="small" plain @click="updateAccountRef?.openModal(scope.row)"
                    >Sửa</el-button
                >
                <el-button type="danger" size="small" @click="openDeleteModal(scope.row)" plain>Xóa</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="Xóa tài khoản" width="30%">
        <span> Bạn có muốn xóa tài khoản này không ? </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Hủy</el-button>
                <el-button type="danger" :loading="deleteLoading" @click="handleDelete"> Xóa </el-button>
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
            <PlusIcon />
        </el-button>
    </div>

    <CreateAccountModal ref="createAccountRef" :call-function="() => loadTableData(1)" />
    <UpdateAccountModal ref="updateAccountRef" :call-function="() => loadTableData(1)" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CreateAccountModal from '@/components/modals/manager/CreateAccountModal.vue';
import UpdateAccountModal from '@/components/modals/manager/UpdateAccountModal.vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { ManagerServices } from '@/services/user/ManagerServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { checkRole } from '@/helpers/checkRole';
import { convertDateTime } from '@/helpers/convertDateTime';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const tableData = ref<any[]>([]);
const totalData = ref<number>(0);
const visible = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);
const deleteId = ref<string>('');

const createAccountRef = ref<InstanceType<typeof CreateAccountModal>>();
const updateAccountRef = ref<InstanceType<typeof UpdateAccountModal>>();

const openDeleteModal = (rowData: any) => {
    deleteId.value = rowData._id;
    visible.value = true;
};

const handleDelete = async () => {
    deleteLoading.value = true;
    try {
        await ManagerServices.deleteStaffAccount(authStore.userInfo, deleteId.value, httpJwt);
        visible.value = false;
        await loadTableData(1);
        ElMessage({
            message: 'Xóa thành công.',
            type: 'success',
        });
    } catch (e) {
        console.error(e);
        ElMessage.error('Xóa thất bại.');
    } finally {
        deleteLoading.value = false;
    }
};

const loadTableData = async (page: any) => {
    tableLoading.value = true;
    try {
        tableData.value = [];
        const res = await ManagerServices.getGatheringStaff(authStore.userInfo, page, httpJwt);
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

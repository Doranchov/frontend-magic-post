<template>
    <div class="title-page">
        <h1>Tài Khoản Trưởng Điểm Tập Kết</h1>
    </div>
    <el-row justify="center">
        <el-col :span="24">
            <el-table
                :data="tableData"
                v-loading="tableLoading"
                class="table"
                table-layout="fixed"
                :default-sort="{ prop: 'stt', order: 'ascending' }"
            >
                <el-table-column label="STT" prop="stt" width="80" sortable></el-table-column>
                <el-table-column label="Họ tên" prop="username" sortable></el-table-column>
                <el-table-column label="Email" prop="email" width="250"></el-table-column>
                <el-table-column label="Số điện thoại" prop="phone"></el-table-column>
                <el-table-column label="Nơi làm việc" prop="workPlace" width="320"></el-table-column>
                <el-table-column fixed="right" label="Hành động" width="150">
                    <template v-slot="scope" #default>
                        <el-button type="primary" size="small" plain @click="updateAccountRef?.openModal(scope.row)"
                            >Sửa</el-button
                        >
                        <el-button type="danger" size="small" @click="openDeleteModal(scope.row)" plain>Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

    <el-dialog v-model="visible" title="Xóa tài khoản" width="30%">
        <span> Bạn có muốn xóa tài khoản này không ? </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">Hủy</el-button>
                <el-button type="danger" :loading="deleteLoading" @click="handleDelete"> Xóa </el-button>
            </span>
        </template>
    </el-dialog>

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

    <CreateAccountModal ref="createAccountRef" :table-data="tableData" />
    <UpdateAccountModal ref="updateAccountRef" :table-data="tableData" />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import CreateAccountModal from '@/components/modals/admin/CreateAccountModal.vue';
import UpdateAccountModal from '@/components/modals/admin/UpdateAccountModal.vue';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import type { Account } from '@/interfaces';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { ElMessage } from 'element-plus';

const tableData = ref<any[]>([]);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);
const deleteId = ref<string>('');

const createAccountRef = ref<InstanceType<typeof CreateAccountModal>>();
const updateAccountRef = ref<InstanceType<typeof UpdateAccountModal>>();

const openDeleteModal = (rowData: any) => {
    deleteId.value = rowData._id;
    visible.value = true;
    console.log(deleteId.value);
};

const handleDelete = async () => {
    try {
        deleteLoading.value = true;
        visible.value = false;
        await UserServices.deleteManagerAccount(authStore.userInfo, httpJwt, deleteId.value);
        const index = tableData.value.findIndex((item) => item._id === deleteId.value);
        if (index !== -1) {
            tableData.value.splice(index, 1);
        }

        tableData.value.forEach((item, index) => {
            item.stt = index + 1;
        });
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

onMounted(async () => {
    try {
        loadingFullScreen();
        tableLoading.value = true;
        const res = await UserServices.getGatheringManager(authStore.userInfo, httpJwt);
        res.map(async (account: Account, index: number) => {
            const district = await DistrictServices.getDistrictById(account.workPlace);
            const province = await ProvinceServices.getProvinceById(district.provinceId);
            tableData.value.push({
                _id: account._id,
                stt: index + 1,
                username: account.username,
                email: account.email,
                phone: account.phone,
                workPlace: `${district.name} - ${province.name}`,
                district: district._id,
                province: province._id,
                role: account.role,
            });
        });
    } catch (e) {
        console.error(e);
    } finally {
        tableLoading.value = false;
    }
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
    width: 80%;
    margin-left: auto;
    margin-right: auto;
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
</style>

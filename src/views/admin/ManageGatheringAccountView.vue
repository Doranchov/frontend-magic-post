<template>
    <div class="title-page">
        <h1>Tài Khoản Trưởng Điểm Tập Kết</h1>
    </div>
    <div class="search">
        <el-input class="search-input" placeholder="Tìm tên tài khoản ..." type="text" v-model="searchName" clearable />
        <el-button type="primary" :loading="searchLoading" class="search-btn" @click="handleSearch(1)"
            >Tìm kiếm</el-button
        >
    </div>
    <el-table
        :data="tableData"
        v-loading="tableLoading"
        :border="true"
        class="table"
        :default-sort="{ prop: 'stt', order: 'ascending' }"
    >
        <el-table-column label="STT" prop="stt" width="80" sortable :align="'center'"> </el-table-column>
        <el-table-column label="Họ tên" prop="username" sortable>
            <template #default="{ row }">
                <el-popover placement="bottom" :width="200" trigger="click" :content="row.username">
                    <template #reference
                        ><el-text truncated> {{ row.username }} </el-text></template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Email" prop="email">
            <template #default="{ row }">
                <el-popover placement="bottom" :width="200" trigger="click" :content="row.email">
                    <template #reference
                        ><el-text truncated> {{ row.email }} </el-text></template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Chức vụ" prop="role">
            <template #default="{ row }">
                <el-popover placement="bottom" :width="230" trigger="click" :content="row.role">
                    <template #reference
                        ><el-text truncated> {{ row.role }} </el-text></template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Số điện thoại" prop="phone" width="110" :align="'center'"></el-table-column>
        <el-table-column label="Nơi làm việc" prop="workPlace">
            <template #default="{ row }">
                <el-popover placement="bottom" :width="200" trigger="click" :content="row.workPlace">
                    <template #reference
                        ><el-text truncated> {{ row.workPlace }} </el-text></template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Ngày tạo" prop="createdAt" sortable>
            <template #default="{ row }">
                <el-popover placement="bottom" :width="200" trigger="click" :content="row.createdAt">
                    <template #reference
                        ><el-text truncated> {{ row.createdAt }} </el-text></template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Hành động" width="130" :align="'center'">
            <template v-slot="scope" #default>
                <el-tooltip effect="dark" content="Chỉnh sửa tài khoản" placement="bottom">
                    <el-button type="primary" size="small" plain @click="updateAccountRef?.openModal(scope.row)"
                        >Sửa</el-button
                    >
                </el-tooltip>
                <el-tooltip effect="dark" content="Xóa tài khoản" placement="bottom">
                    <el-button type="danger" size="small" @click="openDeleteModal(scope.row)" plain>Xóa</el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="totalData"
            @current-change="handleChangePage"
        />
    </div>

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
        <el-tooltip effect="dark" content="Tạo tài khoản mới" placement="top">
            <el-button type="primary" circle size="large" class="btn" @click="createAccountRef?.openModal()">
                <PlusIcon />
            </el-button>
        </el-tooltip>
    </div>

    <CreateAccountModal ref="createAccountRef" :call-function="() => loadTableData(1)" />
    <UpdateAccountModal ref="updateAccountRef" :call-function="() => loadTableData(1)" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CreateAccountModal from '@/components/modals/admin/CreateAccountModal.vue';
import UpdateAccountModal from '@/components/modals/admin/UpdateAccountModal.vue';
import { UserServices } from '@/services/user/UserServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { ElMessage } from 'element-plus';
import { checkRole } from '@/helpers/checkRole';
import { convertDateTime } from '@/helpers/convertDateTime';
import PlusIcon from '@/components/icons/PlusIcon.vue';

const tableData = ref<any[]>([]);
const totalData = ref<number>(0);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const visible = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);
const searchName = ref<string>('');
const searchLoading = ref<boolean>(false);
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
        await UserServices.deleteManagerAccount(authStore.userInfo, httpJwt, deleteId.value);
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

const handleSearch = async (page: any) => {
    searchLoading.value = true;
    tableLoading.value = true;
    try {
        tableData.value = [];
        let res;
        if (searchName.value === '') {
            res = await UserServices.getGatheringManager(authStore.userInfo, page, httpJwt);
        } else {
            res = await UserServices.searchGatheringAccount(authStore.userInfo, page, searchName.value, httpJwt);
        }
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
                roleId: account.role,
            });
        });
    } catch (e) {
        console.error(e);
    } finally {
        searchLoading.value = false;
        tableLoading.value = false;
    }
};

const loadTableData = async (page: any) => {
    tableLoading.value = true;
    try {
        tableData.value = [];
        const res = await UserServices.getGatheringManager(authStore.userInfo, page, httpJwt);
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
                roleId: account.role,
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        tableLoading.value = false;
    }
};

const handleChangePage = async (val: any) => {
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

.btn-add {
    width: 90%;
    position: fixed;
    bottom: 80px;
    left: 0;
    right: 0;
    margin: 0 auto;
}

.search {
    display: flex;
    float: right;
    margin-bottom: 20px;
}

.search-input {
    min-width: 180px;
}

.search-btn {
    margin-left: 20px;
}
.btn {
    float: right;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}

.pagination {
    float: right;
}
</style>

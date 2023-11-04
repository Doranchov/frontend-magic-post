<template>
    <el-table :data="tableData" class="table">
        <el-table-column label="STT" prop="stt" width="60"></el-table-column>
        <el-table-column label="Họ tên" prop="username"></el-table-column>
        <el-table-column label="Email" prop="email" width="250"></el-table-column>
        <el-table-column label="Mật khẩu" prop="password"></el-table-column>
        <el-table-column label="Số điện thoại" prop="phone"></el-table-column>
        <el-table-column label="Nơi làm việc" prop="gathering"></el-table-column>
        <el-table-column fixed="right" label="Hành động" width="150">
            <template #default>
                <el-button type="primary" size="small" plain>Sửa</el-button>
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

    <div class="btn-add">
        <el-button type="primary" circle size="large" class="btn">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" class="icon">
                <path
                    fill="currentColor"
                    d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                ></path>
            </svg>
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref<any[]>([
    {
        stt: 1,
        username: 'Le Nghia',
        email: 'abc@example.com',
        password: '123456',
        phone: '012345678',
        gathering: 'Hải Dương',
    },
    {
        stt: 2,
        username: 'Tran Manh',
        email: 'abc123@example.com',
        password: '123456',
        phone: '012345678',
        gathering: 'Bắc Cạn',
    },
    {
        stt: 3,
        username: 'Giang Minh',
        email: 'abc1234@example.com',
        password: '123456',
        phone: '012345678',
        gathering: 'Lào Cai',
    },
]);

const visible = ref<boolean>(false);
</script>

<style scoped>
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
</style>

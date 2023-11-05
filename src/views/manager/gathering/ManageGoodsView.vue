<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="all">Tất cả</el-radio-button>
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>
    <template v-if="control === 'all'">
        <el-table :data="dataAll">
            <el-table-column prop="stt" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa"></el-table-column>
            <el-table-column prop="sender" label="Người gửi"></el-table-column>
            <el-table-column prop="receiver" label="Người nhận"></el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi"></el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận"></el-table-column>
            <el-table-column prop="status" label="Trạng thái"></el-table-column>
        </el-table>
    </template>

    <template v-if="control === 'send'">
        <el-table :data="dataTableSend">
            <el-table-column prop="stt" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa"></el-table-column>
            <el-table-column prop="sender" label="Người gửi"></el-table-column>
            <el-table-column prop="receiver" label="Người nhận"></el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi"></el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận"></el-table-column>
            <el-table-column prop="status" label="Trạng thái"></el-table-column>
        </el-table>
    </template>

    <template v-if="control === 'receive'">
        <el-table :data="dataTableReceive">
            <el-table-column prop="stt" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa"></el-table-column>
            <el-table-column prop="sender" label="Người gửi"></el-table-column>
            <el-table-column prop="receiver" label="Người nhận"></el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi"></el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận"></el-table-column>
            <el-table-column prop="status" label="Trạng thái"></el-table-column>
        </el-table>
    </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const control = ref<string>('all');

const dataSend = [
    {
        stt: 1,
        name: 'Hàng hóa 1',
        sender: 'Người gửi 1',
        receiver: 'Người nhận 1',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Hải Dương',
        status: 'Thành công',
    },
    {
        stt: 2,
        name: 'Hàng hóa 2',
        sender: 'Người gửi 2',
        receiver: 'Người nhận 2',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 3,
        name: 'Hàng hóa 3',
        sender: 'Người gửi 3',
        receiver: 'Người nhận 3',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Quảng Ninh',
        status: 'Đang xử lý',
    },
    {
        stt: 4,
        name: 'Hàng hóa 4',
        sender: 'Người gửi 4',
        receiver: 'Người nhận 4',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Bắc Ninh',
        status: 'Thất bại',
    },
];

const dataTableSend = ref<any[]>(dataSend);

const dataReceive = [
    {
        stt: 1,
        name: 'Hàng hóa 1',
        sender: 'Người gửi 1',
        receiver: 'Người nhận 1',
        sendingAddress: 'Hải Dương',
        deliveryAddress: 'Hà Nội',
        status: 'Đang xử lý',
    },
    {
        stt: 2,
        name: 'Hàng hóa 2',
        sender: 'Người gửi 2',
        receiver: 'Người nhận 2',
        sendingAddress: 'Hưng Yên',
        deliveryAddress: 'Hà Nội',
        status: 'Đang xử lý',
    },
    {
        stt: 3,
        name: 'Hàng hóa 3',
        sender: 'Người gửi 3',
        receiver: 'Người nhận 3',
        sendingAddress: 'Quảng Ninh',
        deliveryAddress: 'Hà Nội',
        status: 'Đang xử lý',
    },
];

const dataTableReceive = ref<any[]>(dataReceive);

const dataAll = [...dataSend, ...dataReceive];

const handleChangeRadio = () => {
    // console.log(control.value);
};
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
}
</style>

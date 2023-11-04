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
        <el-select v-model="valueSend" class="m-2" placeholder="Chọn nơi tập kết" @change="handleChangeValueSend">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
        <el-select v-model="valueReceive" class="m-2" placeholder="Chọn nơi tập kết" @change="handleChangeValueReceive">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
const valueSend = ref<string>('');
const valueReceive = ref<string>('');

const options = [
    {
        label: 'Hà Nội',
        value: 'Hà Nội',
    },
    {
        label: 'Hải Dương',
        value: 'Hải Dương',
    },
    {
        label: 'Hưng Yên',
        value: 'Hưng Yên',
    },
    {
        label: 'Quảng Ninh',
        value: 'Quảng Ninh',
    },
];

const dataAll = [
    {
        stt: 1,
        name: 'Hàng hóa 1',
        sender: 'Người gửi 1',
        receiver: 'Người nhận 1',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 2,
        name: 'Hàng hóa 2',
        sender: 'Người gửi 2',
        receiver: 'Người nhận 2',
        sendingAddress: 'Hưng Yên',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 3,
        name: 'Hàng hóa 3',
        sender: 'Người gửi 3',
        receiver: 'Người nhận 3',
        sendingAddress: 'Quảng Ninh',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 4,
        name: 'Hàng hóa 4',
        sender: 'Người gửi 4',
        receiver: 'Người nhận 4',
        sendingAddress: 'Hải Dương',
        deliveryAddress: 'Hà Nội',
        status: 'Thất bại',
    },
    {
        stt: 5,
        name: 'Hàng hóa 5',
        sender: 'Người gửi 5',
        receiver: 'Người nhận 5',
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Hải Dương',
        status: 'Thành công',
    },
];

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
        sendingAddress: 'Hưng Yên',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 3,
        name: 'Hàng hóa 3',
        sender: 'Người gửi 3',
        receiver: 'Người nhận 3',
        sendingAddress: 'Quảng Ninh',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 4,
        name: 'Hàng hóa 4',
        sender: 'Người gửi 4',
        receiver: 'Người nhận 4',
        sendingAddress: 'Hải Dương',
        deliveryAddress: 'Hà Nội',
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
        sendingAddress: 'Hà Nội',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 2,
        name: 'Hàng hóa 2',
        sender: 'Người gửi 2',
        receiver: 'Người nhận 2',
        sendingAddress: 'Hưng Yên',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
    {
        stt: 3,
        name: 'Hàng hóa 3',
        sender: 'Người gửi 3',
        receiver: 'Người nhận 3',
        sendingAddress: 'Quảng Ninh',
        deliveryAddress: 'Hải Dương',
        status: 'Đang xử lý',
    },
];

const dataTableReceive = ref<any[]>(dataReceive);

const handleChangeRadio = () => {
    // console.log(control.value);
};

const handleChangeValueSend = (value: any) => {
    dataTableSend.value = dataSend.filter((item) => item.sendingAddress === value);
};

const handleChangeValueReceive = (value: any) => {
    console.log(value);
    dataTableReceive.value = dataReceive.filter((item) => item.deliveryAddress === value);
    console.log(dataTableReceive.value);
};
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
}
</style>

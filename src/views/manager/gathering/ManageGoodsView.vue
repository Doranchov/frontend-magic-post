<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>

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
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import { onMounted, ref } from 'vue';

const control = ref<string>('receive');

const dataTableSend = ref<any[]>([]);

const dataTableReceive = ref<any[]>([]);

const handleChangeRadio = () => {
    // console.log(control.value);
};

onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
}
</style>

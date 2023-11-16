<template>
    <el-row justify="space-evenly">
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <svg
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ea893728=""
                            class="icon-user"
                        >
                            <path
                                fill="currentColor"
                                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                            ></path>
                        </svg>
                    </span>
                    <span>Người gửi</span>
                </div>
                <div class="box-content">
                    <el-form label-position="left" label-width="150px">
                        <el-form-item label="Điện thoại">
                            <el-input v-model="senderPhone" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Họ tên người gửi">
                            <el-input v-model="senderUsername" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Địa chỉ">
                            <el-select v-model="senderAddress" class="m-2" placeholder="Địa chỉ người gửi">
                                <el-option
                                    class="address-option"
                                    v-for="item in district"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Nơi gửi">
                            <el-select v-model="sendingAddress" class="m-2" placeholder="Nơi gửi hàng">
                                <el-option
                                    v-for="item in district"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <svg
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ea893728=""
                            class="icon-user"
                        >
                            <path
                                fill="currentColor"
                                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                            ></path>
                        </svg>
                    </span>
                    <span>Người nhận</span>
                </div>
                <div class="box-content">
                    <el-form label-position="left" label-width="150px">
                        <el-form-item label="Điện thoại">
                            <el-input v-model="receiverPhone" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Họ tên người nhận">
                            <el-input v-model="receiverUsername" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Địa chỉ">
                            <el-select v-model="receiverAddress" class="m-2" placeholder="Địa chỉ người nhận">
                                <el-option
                                    class="address-option"
                                    v-for="item in district"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Nơi nhận">
                            <el-select v-model="deliveryAddress" class="m-2" placeholder="Nơi nhận hàng">
                                <el-option
                                    v-for="item in district"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row justify="space-evenly" align="bottom">
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <svg
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ea893728=""
                            class="icon-user"
                        >
                            <path
                                fill="currentColor"
                                d="M317.056 128 128 344.064V896h768V344.064L706.944 128H317.056zm-14.528-64h418.944a32 32 0 0 1 24.064 10.88l206.528 236.096A32 32 0 0 1 960 332.032V928a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V332.032a32 32 0 0 1 7.936-21.12L278.4 75.008A32 32 0 0 1 302.528 64z"
                            ></path>
                            <path fill="currentColor" d="M64 320h896v64H64z"></path>
                            <path
                                fill="currentColor"
                                d="M448 327.872V640h128V327.872L526.08 128h-28.16L448 327.872zM448 64h128l64 256v352a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V320l64-256z"
                            ></path>
                        </svg>
                    </span>
                    <span>Thông tin hàng hóa</span>
                </div>
                <div class="box-content">
                    <el-form label-position="left" label-width="150px">
                        <el-form-item label="Tên hàng hóa">
                            <el-input v-model="namePackage" autocomplete="off" type="text" />
                        </el-form-item>

                        <el-form-item label="Trọng lượng">
                            <el-input
                                v-model="weightPackage"
                                autocomplete="off"
                                type="number"
                                step="0.1"
                                class="kg-input"
                                placeholder="Tính theo kilogram (kg)"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="box-container">
                <div class="box-header">
                    <span>
                        <svg
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            data-v-ea893728=""
                            class="icon-user"
                        >
                            <path
                                fill="currentColor"
                                d="M128.896 736H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v96h164.544a32 32 0 0 1 31.616 27.136l54.144 352A32 32 0 0 1 922.688 736h-91.52a144 144 0 1 1-286.272 0H415.104a144 144 0 1 1-286.272 0zm23.36-64a143.872 143.872 0 0 1 239.488 0H568.32c17.088-25.6 42.24-45.376 71.744-55.808V256H128v416h24.256zm655.488 0h77.632l-19.648-128H704v64.896A144 144 0 0 1 807.744 672zm48.128-192-14.72-96H704v96h151.872zM688 832a80 80 0 1 0 0-160 80 80 0 0 0 0 160zm-416 0a80 80 0 1 0 0-160 80 80 0 0 0 0 160z"
                            ></path>
                        </svg>
                    </span>
                    <span>Thông tin vận chuyển</span>
                </div>
                <div class="box-content">
                    <el-form label-position="left" label-width="150px">
                        <el-form-item label="Phí vận chuyển">
                            <el-input
                                v-model="shippingFee"
                                autocomplete="off"
                                type="number"
                                step="1000"
                                placeholder="Tính theo Việt Nam Đồng (vnd)"
                            />
                        </el-form-item>

                        <el-form-item label="Phương thức vận chuyển">
                            <el-select v-model="shippingMethod" placeholder="Phương thức vận chuyển">
                                <el-option v-for="item in methods" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>

    <el-row justify="end">
        <el-col :span="4">
            <el-button type="primary" size="large">Tạo đơn hàng</el-button>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';

const district = [
    {
        label: 'Kim Mã',
        value: 'Kim Mã',
    },
    {
        label: 'Đống Đa',
        value: 'Đống Đa',
    },
    {
        label: 'Cầu Giấy',
        value: 'Cầu Giấy',
    },
    {
        label: 'Thanh Xuân',
        value: 'Thanh Xuân',
    },
];

const province = [
    {
        label: 'Hà Nội',
        value: 'Hà Nội',
    },
    {
        label: 'Hải Dương',
        value: 'Hải Dương',
    },
    {
        label: 'Hải Phòng',
        value: 'Hải Phòng',
    },
    {
        label: 'Quảng Ninh',
        value: 'Quảng Ninh',
    },
];

const senderPhone = ref<string>('');
const senderUsername = ref<string>('');
const senderAddress = ref<string>('');
const sendingAddress = ref<string>('');

const receiverPhone = ref<string>('');
const receiverUsername = ref<string>('');
const receiverAddress = ref<string>('');
const deliveryAddress = ref<string>('');

const namePackage = ref<string>('');
const weightPackage = ref<number>();

const shippingFee = ref<number>();
const shippingMethod = ref<string>('');
const methods = [
    {
        label: 'Vận chuyển nhanh',
        value: 'fast',
    },
    {
        label: 'Vận chuyển tiêu chuẩn',
        value: 'express',
    },
];

onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.box-container {
    border: 1px solid #b1b3b8;
    border-radius: 8px;
}
.box-header {
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #b1b3b8;
    border-radius: 6px 6px 0 0;
}

.icon-user {
    width: 20px;
    margin-left: 8px;
    margin-right: 6px;
}

.box-content {
    padding: 16px;
}

.el-row + .el-row {
    margin-top: 20px;
}
</style>

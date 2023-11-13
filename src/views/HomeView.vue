<script setup lang="ts">
import { onMounted } from 'vue';

const options = [
    {
        value: 'Thái Bình',
        label: 'Thái Bình',
        children: [
            {
                value: 'Thái Thụy',
                label: 'Thái Thụy',
            },
            {
                value: 'Đông Hưng',
                label: 'Đông Hứng',
            },
        ],
    },
    {
        value: 'Hải Dương',
        label: 'Hải Dương',
        children: [
            {
                value: 'Kinh Môn',
                label: 'Kinh Môn',
            },
        ],
    },
];
</script>
<template>
    <div class="app">
        <div>
            <img class="background-image" src="src/assets/web-shipping.jpg" />
        </div>
        <div id="intro">
            <p>TIẾT KIỆM THỜI GIAN VÀ TIỀN BẠC - LÊN TỚI 75% CHO ĐƠN HÀNG ĐẦU TIÊN</p>
            <h1>VẬN CHUYỂN HÀNG HÓA TIN CẬY, NHANH GỌN VÀ TIỆN LỢI!</h1>
            <el-cascader class="comin_place" placeholder="Địa điểm gửi" :options="options" filterable size="large" />
            <el-cascader class="recei_place" placeholder="Địa điểm nhận" :options="options" filterable size="large" />
            <el-button class="create" type="warning" round>Khởi tạo đơn hàng</el-button>
        </div>
    </div>
    <br /><br /><br />
    <div class="info">
        <h1>Hàng triệu người tin dùng MagicPost</h1>
    </div>
</template>

<style>
.app {
    position: relative;
    z-index: 0;
    margin: 0;
    overflow: hidden;
}

.background-image {
    /* visibility: hidden; */
    position: fixed;
    margin: 0px;
    width: 100%;
    top: 60px;
    left: 0;
    z-index: -1;
    background-size: initial;
    background-position: center;
}

#intro {
    width: 40.5vw;
    color: whitesmoke;
    float: left;
    /* display: inline; */
    margin: 20vh 0 0 58vw;
}
#intro h1 {
    font-weight: 750;
    font-size: 2.5vw;
}
#intro p {
    font-size: small;
    margin-bottom: 10px;
}
.recei_place {
    margin-left: 40px;
}
.create {
    width: 18vw;
    height: 7vh;
    margin: 2vh 0 0 8vw;
}
el-cascader {
    size: 500px;
}
.info h1 {
    text-align: center;

    /* position: fixed;
    display: block; */
}
</style>

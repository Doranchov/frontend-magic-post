<template>
    <el-container>
        <el-aside width="50%">
            <div class="left">
                <div class="banner-greeting">
                    <span>Chào mừng bạn đến</span>
                    <h1>MagicPost</h1>
                </div>
                <el-card class="search-form">
                    <template #header><h3>Tra cứu đơn hàng</h3></template>
                    <div>
                        <el-input type="text" placeholder="Nhập mã đơn hàng" size="large" />
                        <div class="info">
                            Mã vận đơn/ mã đơn hàng là mã code theo dõi trên đơn hàng, chứng từ gửi qua MagicPost. Bạn
                            có thể tra cứu theo ví dụ sau: 111111XYZ, 123456ABC, ...
                        </div>
                        <el-button class="btn-search" type="primary" size="large">Tìm kiếm đơn</el-button>
                    </div>
                </el-card>
            </div>
        </el-aside>
        <el-main>abc</el-main>
    </el-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
h3 {
    margin: 0;
}

.banner-greeting span {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}

.banner-greeting h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 48px;
    margin-bottom: 33px;
    margin-top: 0;
}

.left {
    padding: 10px;
}
.search-form {
    width: 100%;
}

.search-body {
    padding-bottom: 20px;
}

.btn-search {
    margin-top: 20px;
}

.info {
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
    color: #5e6278;
    margin-bottom: 0;
    font-weight: 500;
}
</style>

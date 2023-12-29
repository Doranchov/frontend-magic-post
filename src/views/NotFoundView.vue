<template>
    <div class="container">
        <el-row justify="center">
            <el-col :xs="16" :sm="14" :md="12" :lg="8">
                <div class="four_zero_four_bg">
                    <NotFoundIcon />
                </div>

                <div class="contant_box_404">
                    <h1 class="h2">Có vẻ như bạn đang bị lạc</h1>

                    <p>Trang bạn đang tìm kiếm không tồn tại!</p>

                    <el-button type="primary" @click="goHome" class="btn-back">Trở về trang chủ</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import NotFoundIcon from '@/components/icons/NotFoundIcon.vue';

function goHome() {
    router.push('/');
}
</script>

<style scoped>
.not-found-container {
}

.four_zero_four_bg {
    background-color: #fff;
    text-align: center;
}

.contant_box_404 {
    text-align: center;
}

.btn-back {
    margin-top: 10px;
}
</style>

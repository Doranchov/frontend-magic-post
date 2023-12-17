<template>
    <div class="common-layout">
        <el-container>
            <el-header><Header /></el-header>

            <el-main id="main">
                <router-view></router-view>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
#main {
    max-width: 100%;
    margin: 0;
}
</style>

<template>
    <div class="common-layout">
        <el-container>
            <Header />
            <el-main id="main">
                <router-view></router-view>
            </el-main>
            <Footer />
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
#main {
    margin-top: 60px;
    margin-bottom: 0px;
    max-width: 100%;
    margin-right: 0px;
    margin-left: 0px;
}
</style>

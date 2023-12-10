<template>
    <div class="pagination">
        <el-pagination
            :current-page="props.currentPage"
            :page-size="props.pageSize"
            :background="true"
            layout="prev, pager, next, jumper"
            :total="totalData"
            @size-change=""
            @current-change="props.handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentPage: number;
    pageSize: number;
    totalData: number;
    handleCurrentChange: (val: number) => Promise<void>;
}>();
</script>

<style scoped>
.pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
}
</style>

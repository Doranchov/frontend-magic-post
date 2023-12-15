<template>
    <el-container>
        <el-aside width="45%">
            <div class="left">
                <div class="banner-greeting">
                    <span>Chào mừng bạn đến</span>
                    <h1>MagicPost</h1>
                </div>
                <el-card class="search-form">
                    <template #header><h3>Tra cứu đơn hàng</h3></template>
                    <div>
                        <el-form :model="model" :rules="rules" ref="searchFormRef">
                            <el-row :gutter="40" justify="center" align="middle">
                                <el-col :span="11">
                                    <el-form-item prop="code"
                                        ><el-input
                                            type="text"
                                            v-model="model.code"
                                            placeholder="Nhập mã đơn hàng"
                                            size="large"
                                            :disabled="model.phone !== ''"
                                            @input="handleChangeText"
                                            clearable
                                    /></el-form-item>
                                </el-col>
                                <span class="or">hoặc</span>
                                <el-col :span="11">
                                    <el-form-item prop="phone">
                                        <el-input
                                            type="text"
                                            v-model="model.phone"
                                            placeholder="Nhập số điện thoại"
                                            size="large"
                                            :disabled="model.code !== ''"
                                            @input="handleChangeText"
                                            clearable
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-button
                                class="btn-search"
                                :loading="searchLoading"
                                @click="submitForm(searchFormRef)"
                                @keyup.enter="submitForm(searchFormRef)"
                                native-type="submit"
                                type="primary"
                                >Tìm kiếm đơn</el-button
                            >
                        </el-form>
                        <div class="info">
                            Mã vận đơn/ mã đơn hàng là mã code theo dõi trên đơn hàng, chứng từ gửi qua MagicPost. Bạn
                            có thể tra cứu theo ví dụ sau: 111111XYZ, 123456ABC, ... <br />Lưu ý: Chỉ nhập 1 trong 2.
                        </div>
                    </div>
                </el-card>
            </div>
        </el-aside>
        <el-main>
            <div class="header-result">Kết quả tìm kiếm</div>
            <div class="content-aside" v-loading="resultLoading" element-loading-text="Đang xử lý ...">
                <Card v-if="resultSearch.length > 0" v-for="item in resultSearch" :data="item" />
            </div>
            <div class="pagination" v-if="resultSearch.length > 0">
                <el-pagination
                    :page-size="2"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="totalData"
                    @current-change="handleChangePage"
                />
            </div>
            <div class="not-found" v-if="visible">
                <NotFoundIcon />
                <div>Không Có Đơn Hàng Nào !</div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import Card from '@/components/Card.vue';
import { ElForm, type FormRules, ElMessage } from 'element-plus';
import { CustomerServices } from '@/services/user/CustomerServices';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import NotFoundIcon from '@/components/icons/NotFoundIcon.vue';

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const model = ref({
    code: '',
    phone: '',
});
const searchLoading = ref(false);
const resultLoading = ref(false);
const visible = ref(false);
const resultSearch = ref([]);
const totalData = ref(0);
const searchFormRef = ref<typeof ElForm | null>(null);
const rules = reactive<FormRules>({
    code: [
        {
            validator: validateCodeOrPhone,
            trigger: ['blur', 'change'],
        },
    ],
    phone: [
        {
            validator: validateCodeOrPhone,
            trigger: ['blur', 'change'],
        },
    ],
});

function validateCodeOrPhone(rule: any, value: any, callback: any) {
    if (!model.value.code && !model.value.phone) {
        callback(new Error('Vui lòng nhập mã đơn hàng hoặc số điện thoại'));
    } else {
        callback();
    }
}

const handleChangePage = async (val: number) => {
    await search(model.value, val);
};

const handleChangeText = () => {
    visible.value = false;
};

const search = async (query: any, page: any) => {
    searchLoading.value = true;
    resultLoading.value = true;
    try {
        if (query.code !== '') {
            const res = await CustomerServices.getPackageByCode(authStore.userInfo, query.code, httpJwt);
            resultSearch.value = res.data;
            if (res.data.length <= 0) visible.value = true;
        }
        if (query.phone !== '') {
            const res = await CustomerServices.getPackageByPhone(authStore.userInfo, page, query.phone, httpJwt);
            resultSearch.value = res.data;
            totalData.value = res.total;
            if (res.data.length <= 0) visible.value = true;
        }
    } catch (e) {
        console.log(e);
        ElMessage({ message: 'Không tìm thấy.', type: 'warning' });
    } finally {
        resultLoading.value = false;
        searchLoading.value = false;
    }
};

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate(async (valid: any) => {
        if (valid) {
            await search(model.value, 1);
        } else {
            return false;
        }
    });
};

onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
h3 {
    margin: 0;
}

.banner-greeting {
    height: 120px;
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


.btn-search {
    margin-left: 10px;
}

.info {
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
    color: #5e6278;
    margin-bottom: 0;
    font-weight: 500;
}

.header-result {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 36px;
    line-height: 48px;
    margin: 0 0 33px 0;
    height: 110px;
}

.or {
    margin-bottom: 18px;
}

.pagination {
    float: right;
}

.not-found {
    text-align: center;
}

.not-found div {
    font-weight: 600;
    font-size: 24px;
}
</style>

<script setup lang="ts">
import { onBeforeMount, ref, onMounted } from 'vue';
import useProvinceStore from '@/stores/useProvinceStore';
import useDistrictStore from '@/stores/useDistrictStore';
import type { District } from '@/interfaces/index';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import StarIcon from '@/components/icons/StarIcon.vue';

interface AddressOption {
    label: string;
    value: string;
    children: District[];
}

const provinceStore = useProvinceStore();
const districtStore = useDistrictStore();

const options = ref<AddressOption[]>([]);

onBeforeMount(async () => {
    await provinceStore.getAllProvinces();
    await districtStore.getAllDistricts();
    for (const province of provinceStore.provinces) {
        const childrens: any[] = [];
        for (const district of districtStore.districts) {
            if (district.provinceId === province._id) {
                childrens.push({
                    value: district._id,
                    label: district.name,
                });
            }
        }
        options.value.push({
            label: province.name,
            value: province._id,
            children: childrens,
        });
    }
});

onMounted(() => {
    loadingFullScreen();
});
</script>
<template>
    <div>
        <el-image class="background-image" src="src/assets/web-shipping.jpg" />
    </div>
    <div class="app">
        <div id="intro">
            <p>TIẾT KIỆM THỜI GIAN VÀ TIỀN BẠC - LÊN TỚI 75% CHO ĐƠN HÀNG ĐẦU TIÊN</p>
            <h1>VẬN CHUYỂN HÀNG HÓA TIN CẬY, NHANH GỌN VÀ TIỆN LỢI!</h1>
            <el-cascader class="comin_place" placeholder="Địa điểm gửi" :options="options" filterable size="large" />
            <el-cascader class="recei_place" placeholder="Địa điểm nhận" :options="options" filterable size="large" />
            <el-button class="create" type="warning" round>Khởi tạo đơn hàng</el-button>
        </div>
    </div>

    <div class="info">
        <h1>Hàng triệu người tin dùng MagicPost</h1>
        <div class="star">
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
        </div>
        <div class="goodpoint">
            <el-row :gutter="0">
                <el-col :span="6" class="GPcol">
                    <el-image class="GPImage" src="src/assets/feature-fastandeasy.webp"></el-image>
                    <h3>Nhanh gọn và tiện lợi</h3>
                    <p>Hoàn thành đơn hàng của bạn chỉ với những thao tác đơn giản</p>
                </el-col>
                <el-col :span="6" class="GPcol"
                    ><el-image class="GPImage" src="src/assets/feature-helpful.png"></el-image>
                    <h3>Tận tình</h3>
                    <p>
                        Bạn cần trợ giúp? Hãy liên lạc ngay với chúng tôi qua email hoặc hotline để được trợ giúp
                    </p></el-col
                >
                <el-col :span="6" class="GPcol"
                    ><el-image class="GPImage" src="src/assets/feature-prices-1.png"></el-image>
                    <h3>Tiết kiệm</h3>
                    <p>
                        Dịch vụ của của chúng tôi mang lại cước phí tiết kiệm nhất, giá thành rẻ hơn lên tới 70% so với
                        những dịch vụ vận chuyển thông thường
                    </p></el-col
                >
                <el-col :span="6" class="GPcol"
                    ><el-image class="GPImage" src="src/assets/feature-trustworthy.webp"></el-image>
                    <h3>Bảo đảm</h3>
                    <p>Đơn hàng của bạn luôn được giám sát trên toàn bộ quá trình vận chuyển</p></el-col
                >
            </el-row>
        </div>
    </div>
    <div><br /><br /><br /><br /></div>
</template>

<style>
h3 {
    margin-top: 15px;
    font-weight: bold !important;
}
p {
    margin-top: 20px;
}
.app {
    position: relative;
    z-index: 0;
    margin: 0;
    overflow: hidden;
}

.background-image {
    /* visibility: hidden; */
    display: inline;
    position: absolute;
    margin: 0px;
    width: 100%;
    top: 60px;
    left: 0;
    z-index: -1;
    background-size: initial;
    background-position: center;
}

#intro {
    display: inline;
    position: sticky;
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

.info {
    margin-top: 45vh;
}
.info h1 {
    font-size: 300%;
    text-align: center;
    /* position: fixed; */
    display: block;
}
.star {
    position: relative;
    width: 180px;
    margin: 0 auto 40px;
    padding: 0 20px;
    height: 24px;
}
.goodpoint {
    text-align: center;
    padding-left: 13vw;
    padding-right: 13vw;
    text-align: left;
}

.GPcol {
    padding: 15px;
}
.GPImage {
    widows: 51;
    height: 63;
}
</style>

<script setup lang="ts">
import MailIcon from '@/components/icons/MailIcon.vue';
import PhoneIcon from '@/components/icons/PhoneIcon.vue';
import LocationIcon from '@/components/icons/LocationIcon.vue';
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';
</script>
<template>
    <el-footer class="container">
        <div>
            <el-image src="src/assets//logo_name.png" style="height: 200px"></el-image>
        </div>
        <el-row :gutter="20">
            <el-col :span="9">
                <div><h2>Địa chỉ</h2></div>
                <div class="locate">
                    <LocationIcon></LocationIcon>Văn phòng chính: 144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        Email:
                        <div><MailIcon></MailIcon>Contact@MagicPost.com</div>
                    </el-col>
                    <el-col :span="12"
                        >Điện thoại:
                        <div><PhoneIcon></PhoneIcon>1900 9981</div></el-col
                    >
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row> <h2>Về Magic Post</h2> </el-row>
                <el-row><a href="#"> Giới thiệu </a></el-row>
                <el-row><a href="#"> Mạng lưới bưu cục </a></el-row>
                <el-row><a href="#"> FAQ </a></el-row>
            </el-col>
            <el-col :span="5">
                <el-row> <h2>Hỗ trợ khách hàng</h2> </el-row>
                <el-row><a href="#"> Chính sách bảo mật </a></el-row>
                <el-row><a href="#"> Chính sách vận chuyển</a></el-row>
                <el-row><a href="#"> Chính sách khiếu nại </a></el-row>
                <el-row><a href="#"> Quy định vật phẩm cấm </a></el-row>
            </el-col>
            <el-col :span="5"
                ><h2>Liên hệ ngay</h2>
                <el-row><h2>1900 9981</h2></el-row>
                <el-row :gutter="0">
                    <el-col :span="4">
                        <div>
                            <a href="https://www.facebook.com/"><FacebookIcon></FacebookIcon></a>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <a href="https://www.youtube.com/"><YoutubeIcon></YoutubeIcon></a>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <a href="https://www.X.com/"><XIcon></XIcon></a>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-footer>
</template>

<style scoped>
.container {
    /* margin-top: auto; */
    max-width: 100%;
    align-content: center;
    /* background-color: rgb(245, 245, 245) !important; */
    /* height: 500px; */
}

.locate {
    max-width: 300px;
}
a {
    color: black;
}
el-row {
    border: 1px solid black !important;
}
</style>

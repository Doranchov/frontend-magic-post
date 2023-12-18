<script setup lang="ts">
import MailIcon from '@/components/icons/MailIcon.vue';
import PhoneIcon from '@/components/icons/PhoneIcon.vue';
import LocationIcon from '@/components/icons/LocationIcon.vue';
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';
</script>
<template>
    <div id="footer" class="container">
        <!-- <div>
            <el-image src="src/assets//logo_name.png" style="height: 200px"></el-image>
        </div> -->
        <el-row :gutter="20" justify="center" class="row">
            <el-col :span="6" class="col">
                <div><h2>Địa chỉ</h2></div>
                <div class="info-footer">
                    <LocationIcon />Văn phòng chính: 144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                </div>
                <div class="info-footer">
                    <MailIcon />
                    Email: magicpost@gmail.com
                </div>
                <div class="info-footer"><PhoneIcon />Điện thoại: 0325875898</div>
            </el-col>
            <el-col :span="6" class="col">
                <el-row> <h2>Về Magic Post</h2> </el-row>
                <el-row> Giới thiệu </el-row>
                <el-row> Mạng lưới bưu cục </el-row>
                <el-row> FAQ </el-row>
            </el-col>
            <el-col :span="6" class="col">
                <el-row> <h2>Hỗ trợ khách hàng</h2> </el-row>
                <el-row> Chính sách bảo mật </el-row>
                <el-row> Chính sách vận chuyển</el-row>
                <el-row> Chính sách khiếu nại </el-row>
                <el-row> Quy định vật phẩm cấm </el-row>
            </el-col>
            <el-col :span="6" class="col"
                ><h2>Liên hệ ngay</h2>
                <el-row><h2>1900 9981</h2></el-row>
                <div>Hãy theo dõi MagicPost trên các kênh mạng xã hội để cập nhật các thông tin mới nhất</div>
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
    </div>
</template>

<style scoped>
.container {
    padding-top: 2.5rem;
    padding-left: 13vw;
    padding-right: 13vw;
    background-color: #000;
    color: #fff;
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

.row {
    margin-left: auto;
    margin-right: auto;
}

.col {
    padding: 15px;
}

.info-footer {
    display: flex;
    align-items: center;
}
</style>

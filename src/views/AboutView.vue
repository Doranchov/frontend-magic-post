<template>
    <div class="about-us">
        <div class="spacing"></div>
        <h1>Luôn đặt người dùng lên hàng đầu</h1>
        <div class="spacing"></div>
        <h2>
            Với hơn 10 năm kinh nghiệm trong ngành vận chuyển và đội ngũ nhân viên chuyên nghiệp, chúng tôi tự hào là
            một trong những công ty hàng đầu trong lĩnh vực này.
        </h2>
        <div>
            <video width="960" height="720" controls>
                <source src="src/assets/abu-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="spacing"></div>
        <h1>Đội ngũ phát triển</h1>
        <div class="spacing"></div>
        <h2>
            Sự tận tâm và sáng tạo là những giá trị cốt lõi mà đội ngũ phát triển của chúng tôi mang đến. Chúng tôi
            không ngừng nghiên cứu và áp dụng các công nghệ mới nhất để nâng cao trải nghiệm của khách hàng và tối ưu
            hóa quy trình vận chuyển
        </h2>
        <div class="spacing"></div>
        <div class="dev-container">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="dev">
                        <el-image class="devpic" src="@/assets/dev.jpg" style="b"></el-image>
                        <h3>Lê Vũ Minh Nghĩa</h3>
                        <p>
                            Lập trình viên web 20 năm kinh nghiệm, là diễn giả của nhiều cuộc đối thoại về tương lai của
                            lập trình viên
                        </p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dev">
                        <el-image class="devpic" src="@/assets/dev.jpg" style="b"></el-image>
                        <h3>Giang Bảo Minh</h3>
                        <p>Kẻ bú win vĩ đại</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dev">
                        <el-image class="devpic" src="@/assets/dev.jpg" style="b"></el-image>
                        <h3>Trần Thọ Mạnh</h3>
                        <p>
                            3000 rate CodeForce, Sở hữu kênh diutube dạy lập trình hàng đầu thế giới với 50 triệu người
                            đăng kí, người sáng lập ra thuật toán sắp xếp
                        </p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="spacing"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.about-us {
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}
.dev-container {
    width: 50vw;
    margin: auto;
}
#abu {
    padding: 10px;
    border: 2px solid black;
    border-radius: 2px;
    text-align: center;
}

.spacing {
    height: 50px;
}
h1 {
    font-weight: 600;
    font-size: 50px;
}

h2 {
    width: 60vw;
    margin: auto;
}
h3 {
    padding-bottom: 10px;
}
p {
    text-align: left;
}
</style>

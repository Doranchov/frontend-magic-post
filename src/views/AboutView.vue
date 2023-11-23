<template>
    <div class="about-us">
        <h1>About Us</h1>
        <p>Chúng tôi là một công ty vận chuyển hàng đầu, chuyên cung cấp các dịch vụ vận chuyển hàng hóa.</p>

        <h2>Dịch vụ của chúng tôi:</h2>
        <ul>
            <li>Vận chuyển hàng hóa trong nước</li>
            <li>Vận chuyển hàng hóa quốc tế</li>
            <li>Vận chuyển hàng hóa nhanh</li>
        </ul>

        <h2>Cam kết chất lượng:</h2>
        <p>
            Chúng tôi cam kết cung cấp dịch vụ vận chuyển chất lượng cao với đội ngũ nhân viên chuyên nghiệp và đảm bảo
            an toàn cho hàng hóa của khách hàng.
        </p>
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
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

h2 {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
}

ul {
    margin-top: 10px;
    margin-left: 20px;
}

p {
    margin-top: 10px;
}
</style>

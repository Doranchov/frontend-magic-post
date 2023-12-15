<template>
    <div class="receipt" ref="data">
        <el-header class="header">
            <div class="logo">Magic Post</div>
            <div class="qrcode">
                <div><qrcode-vue value="2311306CVL" :size="40" level="H" /></div>
                <div>2311306CVL</div>
            </div>
        </el-header>
        <table>
            <tr>
                <th>
                    <div class="bold title">1. Người gửi</div>
                    <div>
                        <span class="bold">Họ tên: </span>
                        <span>Tran Manh</span>
                    </div>
                    <div>
                        <span class="bold">Địa chỉ gửi: </span>
                        <span>Ba Đình - Hà Nội</span>
                    </div>
                    <div>
                        <span class="bold">Điện thoại: </span>
                        <span>0123456789</span>
                    </div>
                    <div class="uuid">
                        <span>
                            <span class="bold">Mã khách hàng: </span>
                            <span>12osadkqw91k</span>
                        </span>
                        <span>
                            <span class="bold">Mã bưu chính: </span>
                            <span>12osadkqw91k</span>
                        </span>
                    </div>
                </th>
                <th>
                    <div class="bold title">2. Người nhận</div>
                    <div>
                        <span class="bold">Họ tên: </span>
                        <span>Tran Manh</span>
                    </div>
                    <div>
                        <span class="bold">Địa chỉ gửi: </span>
                        <span>Ba Đình - Hà Nội</span>
                    </div>
                    <div>
                        <span class="bold">Điện thoại: </span>
                        <span>0123456789</span>
                    </div>
                    <div class="uuid">
                        <span>
                            <span class="bold">Mã khách hàng: </span>
                            <span>12osadkqw91k</span>
                        </span>
                        <span>
                            <span class="bold">Mã bưu chính: </span>
                            <span>12osadkqw91k</span>
                        </span>
                    </div>
                </th>
            </tr>
            <tr>
                <td>
                    <div>
                        <span class="bold title">3. Tên hàng gửi: </span>
                        <span>Rau</span>
                    </div>
                    <div>
                        <span class="bold title">4. Khối lượng: </span>
                        <span>5kg</span>
                    </div>
                </td>
                <td>
                    <div>
                        <span class="bold title">5. Phí vận chuyển: </span>
                        <span>50000đ</span>
                    </div>
                    <div>
                        <span class="bold title">6. Phương thức vận chuyển: </span>
                        <span>Vận chuyển tiêu chuẩn</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="bold title">7. Cam kết người gửi:</div>
                    <div>
                        Tôi chấp nhận các điều khoản và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm
                        gửi. Trường hợp không phát được thì <i class="underline">chuyển hoàn ngay</i>, tôi sẽ trả cước
                        chuyển hoàn.
                    </div>
                    <div class="sign">
                        <span class="bold title">8. Ngày giờ gửi: </span>
                        <span class="bold title">Chữ ký người gửi</span>
                    </div>
                    <div class="time">7:45 12/12/2023</div>
                </td>
                <td class="sign">
                    <div class="receiver-sign">
                        <div class="bold title">9. Bưu cục chấp nhận</div>
                        <div>Chữ ký GDV nhận</div>
                    </div>
                    <div class="receiver-sign">
                        <div class="bold title">10. Ngày giờ nhận</div>
                        <div class="bold">....... ..../..../......</div>
                        <div>Người nhận/Người được ủy quyền nhận(Ký, ghi rõ họ tên)</div>
                    </div>
                </td>
            </tr>
        </table>
        <el-footer class="footer">
            Hotline: 0325875898 - Website: www.magicpost.com.vn - Email: magicpost@gmail.com
        </el-footer>
    </div>
    <el-button @click="handlePrint(data)">click</el-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QrcodeVue from 'qrcode.vue';

const data = ref<any | null>(null);

const handlePrint = (ref: any) => {
    html2canvas(ref).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 209, 110);
        pdf.save('hoadon.pdf');
    });
};

onMounted(() => {
    loadingFullScreen();
});
</script>

<style scoped>
.receipt {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    width: 50%;
}

.logo {
    font-size: 34px;
    font-weight: 600;
}

.header {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
}

.footer {
    display: flex;
    justify-content: center;
    font-weight: 600;
}

.underline {
    text-decoration: underline;
    font-weight: 600;
}

.uuid {
    display: flex;
    justify-content: space-between;
}

.sign {
    display: flex;
    justify-content: space-between;
    align-items: start;
}

.sign .receiver-sign {
    width: 50%;
}

.time {
    margin-bottom: 40px;
}

.receiver-sign {
    margin-bottom: 91px;
}

.bold {
    font-weight: 600;
}

.title {
    font-size: 18px;
}

.qrcode {
    text-align: center;
}
</style>

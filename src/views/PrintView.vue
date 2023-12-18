<template>
    <div class="receipt" ref="data">
        <el-header class="header">
            <div class="logo">Magic Post</div>
            <div class="qrcode">
                <div><qrcode-vue :value="packageRes.code" :size="40" level="H" /></div>
                <div>{{ packageRes.code }}</div>
            </div>
        </el-header>
        <table>
            <tr>
                <th>
                    <div class="bold title">1. Người gửi</div>
                    <div>
                        <span class="bold">Họ tên: </span>
                        <span>{{ sender.username }}</span>
                    </div>
                    <div>
                        <span class="bold">Địa chỉ gửi: </span>
                        <span>{{ senderAddress.address }}</span>
                    </div>
                    <div>
                        <span class="bold">Điện thoại: </span>
                        <span>{{ sender.phone }}</span>
                    </div>
                    <div class="uuid">
                        <span>
                            <span class="bold">Mã khách hàng: </span>
                            <span>{{ sender._id }}</span>
                        </span>
                        <span>
                            <span class="bold">Mã bưu chính: </span>
                            <span>{{ senderAddress._id }}</span>
                        </span>
                    </div>
                </th>
                <th>
                    <div class="bold title">2. Người nhận</div>
                    <div>
                        <span class="bold">Họ tên: </span>
                        <span>{{ receiver.username }}</span>
                    </div>
                    <div>
                        <span class="bold">Địa chỉ gửi: </span>
                        <span>{{ receiverAddress.address }}</span>
                    </div>
                    <div>
                        <span class="bold">Điện thoại: </span>
                        <span>{{ receiver.phone }}</span>
                    </div>
                    <div class="uuid">
                        <span>
                            <span class="bold">Mã khách hàng: </span>
                            <span>{{ receiver._id }}</span>
                        </span>
                        <span>
                            <span class="bold">Mã bưu chính: </span>
                            <span>{{ receiverAddress._id }}</span>
                        </span>
                    </div>
                </th>
            </tr>
            <tr>
                <td>
                    <div>
                        <span class="bold title">3. Tên hàng gửi: </span>
                        <span>{{ packageRes.name }}</span>
                    </div>
                    <div>
                        <span class="bold title">4. Khối lượng: </span>
                        <span>{{ packageRes.weight }}kg</span>
                    </div>
                </td>
                <td>
                    <div>
                        <span class="bold title">5. Phí vận chuyển: </span>
                        <span>{{ packageRes.shippingFee }}đ</span>
                    </div>
                    <div>
                        <span class="bold title">6. Phương thức vận chuyển: </span>
                        <span>{{ shippingMethod }}</span>
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
                    <div class="time">{{ convertDateTime(packageRes.createdAt) }}</div>
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
    <div class="print">
        <el-button class="btn-print" type="primary" @click="handlePrint(data)">In biên lai</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QrcodeVue from 'qrcode.vue';
import { useRoute } from 'vue-router';
import { PackageServices } from '@/services/package/PackageServices';
import { convertDateTime } from '@/helpers/convertDateTime';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { PointServices } from '@/services/point/PointServices';

const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);
const data = ref<any | null>(null);
const route = useRoute();
const packageRes = ref({
    _id: '',
    name: '',
    code: '',
    weight: '',
    senderId: '',
    receiverId: '',
    transactionSendingAddress: '',
    transactionDeliveryAddress: '',
    shippingFee: '',
    shippingMethod: '',
    createdAt: '',
});
const shippingMethod = computed(() => {
    if (packageRes.value.shippingMethod === 'fast') {
        return 'Vận chuyển nhanh';
    } else {
        return 'Vận chuyển tiêu chuẩn';
    }
});
const sender = ref({
    _id: '',
    username: '',
    phone: '',
});
const receiver = ref({
    _id: '',
    username: '',
    phone: '',
});
const senderAddress = ref({
    _id: '',
    address: '',
});
const receiverAddress = ref({
    _id: '',
    address: '',
});

const handlePrint = (ref: any) => {
    html2canvas(ref).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 209, 110);
        pdf.save('hoadon.pdf');
    });
};

onMounted(async () => {
    loadingFullScreen();
    packageRes.value = await PackageServices.getPackageById(route.params.packageId);
    sender.value = await UserServices.getUserById(authStore.userInfo, packageRes.value.senderId, httpJwt);
    receiver.value = await UserServices.getUserById(authStore.userInfo, packageRes.value.receiverId, httpJwt);

    const transactionPointSend = await PointServices.getTransactionPointByLocation(
        packageRes.value.transactionSendingAddress,
    );
    const transactionPointDelivery = await PointServices.getTransactionPointByLocation(
        packageRes.value.transactionDeliveryAddress,
    );
    const districtSend = await DistrictServices.getDistrictById(packageRes.value.transactionSendingAddress);
    const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
    const districtDelivery = await DistrictServices.getDistrictById(packageRes.value.transactionDeliveryAddress);
    const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);

    senderAddress.value = {
        _id: transactionPointSend._id,
        address: `${districtSend.name} - ${provinceSend.name}`,
    };

    receiverAddress.value = {
        _id: transactionPointDelivery._id,
        address: `${districtDelivery.name} - ${provinceDelivery.name}`,
    };
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
    margin-top: 12px;
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

.print {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.btn-print {
    float: right;
}
</style>

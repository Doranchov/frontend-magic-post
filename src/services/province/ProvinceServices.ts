import { ProvinceAPI } from '@/api/province/ProvinceAPI';
import { http } from '@/utils/http';

export const ProvinceServices = {
    getAll: async () => {
        const responseData = (await http.get(ProvinceAPI.LIST)).data.data;
        return responseData;
    },

    getProvinceById: async (provinceId: any) => {
        const responseData = (await http.get(ProvinceAPI.PROVINCE_BY_ID(provinceId))).data.data;
        return responseData;
    },
};

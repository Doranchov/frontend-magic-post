import { ProvinceAPI } from '@/api/province/ProvinceAPI';
import { http } from '@/utils/http';

export const ProvinceServices = {
    getAll: async () => {
        return (await http.get(ProvinceAPI.LIST)).data.data;
    },

    getProvinceById: async (provinceId: any) => {
        return (await http.get(ProvinceAPI.PROVINCE_BY_ID(provinceId))).data.data;
    },
};

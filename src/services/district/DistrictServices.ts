import { http } from '@/utils/http';
import { DistrictAPI } from '@/api/district/DistrictAPI';

export const DistrictServices = {
    getAll: async () => {
        const responseData = (await http.get(DistrictAPI.LIST)).data.data;
        return responseData;
    },

    getDistrictById: async (districtId: any) => {
        const responseData = (await http.get(DistrictAPI.DISTRICT_BY_ID(districtId))).data.data;
        return responseData;
    },

    getDistrictByProvinceId: async (provinceId: any) => {
        const responseData = (await http.get(DistrictAPI.LIST_BY_PROVINCE_ID(provinceId))).data.data;
        return responseData;
    },
};

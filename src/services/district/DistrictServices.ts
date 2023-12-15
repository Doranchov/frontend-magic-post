import { http } from '@/utils/http';
import { DistrictAPI } from '@/api/district/DistrictAPI';

export const DistrictServices = {
    getAll: async () => {
        return (await http.get(DistrictAPI.LIST)).data.data;
    },

    getDistrictById: async (districtId: any) => {
        return (await http.get(DistrictAPI.DISTRICT_BY_ID(districtId))).data.data;
    },

    getDistrictByProvinceId: async (provinceId: any) => {
        return (await http.get(DistrictAPI.LIST_BY_PROVINCE_ID(provinceId))).data.data;
    },
};

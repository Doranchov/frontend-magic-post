import { defineStore } from 'pinia';
import type { District } from '@/interfaces';
import { DistrictServices } from '@/services/district/DistrictServices';

interface DistrictState {
    districts: District[];
}

const useProvinceStore = defineStore({
    id: 'district',
    state: (): DistrictState => ({
        districts: [],
    }),
    actions: {
        async getDistrictByProvinceId(provinceId: any) {
            try {
                this.districts = await DistrictServices.getDistrictByProvinceId(provinceId);
            } catch (error) {
                console.error('failed to get district by province id ' + error);
            }
        },

        async getAllDistricts() {
            try {
                this.districts = await DistrictServices.getAll();
            } catch (error) {
                console.error('failed to get all ' + error);
            }
        },
    },
});

export default useProvinceStore;

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
                const res = await DistrictServices.getDistrictByProvinceId(provinceId);
                this.districts = res;
            } catch (error) {
                console.error('failed to get all ' + error);
            }
        },
    },
});

export default useProvinceStore;

import { defineStore } from 'pinia';
import type { Province } from '@/interfaces';
import { ProvinceServices } from '@/services/province/ProvinceServices';

interface ProvinceState {
    provinces: Province[] | [];
}

const useProvinceStore = defineStore({
    id: 'province',
    state: (): ProvinceState => ({
        provinces: [],
    }),
    actions: {
        async getAllProvinces() {
            try {
                const res = await ProvinceServices.getAll();
                this.provinces = res;
            } catch (error) {
                console.error('failed to get all ' + error);
            }
        },
    },
});

export default useProvinceStore;
